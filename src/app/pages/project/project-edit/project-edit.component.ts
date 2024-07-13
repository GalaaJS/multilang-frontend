import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../../core/service/project.service';
import { ProjectModel } from '../../../core/model/project.model';
import { LanguageService } from '../../../core/service/language.service';
import { LanguageModel } from '../../../core/model/language.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  model: ProjectModel;
  isEdit = false;
  error: string;

  formGroup = this.formBuilder.group({
    project_name: ['', Validators.required],
    description: ['', Validators.required],
  });

  langs: LanguageModel[] = [];
  selectedLanguages: number[] = [];
  langsDetail: Set<number> = new Set();

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.getDetail(params.get('id')!);
        this.isEdit = true;
      }
    });

    this.languageService.select().subscribe((r) => {
      if (r && r.payload) {
        this.langs = r.payload;
      }
    });
  }

  updateSelection(lang_id: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      const isChecked = input.checked;
      if (isChecked) {
        this.selectedLanguages.push(lang_id);
      } else {
        const index = this.selectedLanguages.indexOf(lang_id);
        if (index > -1) {
          this.selectedLanguages.splice(index, 1);
        }
      }
    }
    console.log('updateSelection', this.selectedLanguages);
  }

  getDetail(id: string): any {
    this.service.detail(id).subscribe((data) => {
      this.model = data.payload;

      this.formGroup = this.formBuilder.group({
        project_name: this.model.project_name,
        description: this.model.description,
      });

      if (this.model.Languages) {
        this.model.Languages.forEach((r) => {
          this.langsDetail.add(r.lang_id);
          this.selectedLanguages.push(r.lang_id);
        });
      }
    });
  }

  onSubmit() {
    const data = {
      project_name: this.formGroup.value.project_name ?? '',
      description: this.formGroup.value.description ?? '',
      languages: this.selectedLanguages,
    };
    if (this.isEdit) {
      this.service.update(this.model.project_id || 0, data).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            alert('Successfully updated');
            this.router.navigateByUrl('/project');
          } else {
            this.error = response.error;
          }
        },
        error: (error) => {
          this.error = error.error.message;
        },
      });
    } else {
      this.service.insert(data).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            alert('Successfully created');
            this.router.navigateByUrl('/project');
          } else {
            this.error = response.error;
          }
        },
        error: (error) => {
          this.error = error.error.message;
        },
      });
    }
  }
}
