import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UrlModel } from '../../../core/model/url.model';
import { ProjectService } from '../../../core/service/project.service';
import { UrlService } from '../../../core/service/url.service';
import { TranslationModel } from '../../../core/model/translation.model';
import { TranslationService } from '../../../core/service/translation.service';

@Component({
  selector: 'app-url-edit',
  templateUrl: './url-edit.component.html',
  styleUrls: ['./url-edit.component.scss'],
})
export class UrlEditComponent implements OnInit {
  model: UrlModel;
  isEdit = false;
  error: string;

  formGroup = this.formBuilder.group({
    url: ['', Validators.required],
    project_id: [0, Validators.required],
  });

  projects: any[] = [];

  translations: TranslationModel[] = [];
  selectedTranslations: number[] = [];
  translationSet: Set<number> = new Set();

  constructor(
    private route: ActivatedRoute,
    private service: UrlService,
    private projectService: ProjectService,
    private translationService: TranslationService,
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

    this.projectService.select().subscribe((r) => {
      if (r && r.payload) {
        this.projects = r.payload;
        if (this.projects.length > 0) {
          if (this.formGroup.get('project_id')!.value === 0) {
            this.formGroup
              .get('project_id')
              ?.setValue(this.projects[0].project_id);
          }
        }
      }
    });

    this.translationService.select().subscribe((r) => {
      if (r && r.payload) {
        this.translations = r.payload;
      }
    });
  }

  getDetail(id: string): any {
    this.service.detail(id).subscribe((data) => {
      this.model = data.payload;

      this.formGroup = this.formBuilder.group({
        url: this.model.url,
        project_id: this.model.project_id ?? 0,
      });

      if (this.model.Translations) {
        this.model.Translations.forEach((r: any) => {
          this.translationSet.add(r.translation_id);
          this.selectedTranslations.push(r.translation_id);
        });
      }
    });
  }

  onProjectChange(event: any): void {
    this.formGroup.get('project_id')?.setValue(+event.target.value);
  }

  updateSelection(lang_id: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      const isChecked = input.checked;
      if (isChecked) {
        this.selectedTranslations.push(lang_id);
      } else {
        const index = this.selectedTranslations.indexOf(lang_id);
        if (index > -1) {
          this.selectedTranslations.splice(index, 1);
        }
      }
    }
    console.log('updateSelection', this.selectedTranslations);
  }

  onSubmit() {
    const data = {
      url: this.formGroup.value.url,
      project_id: this.formGroup.value.project_id,
      translations: this.selectedTranslations,
    };
    if (this.isEdit) {
      this.service.update(this.model.url_id || 0, data).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            alert('Successfully updated');
            this.router.navigateByUrl('/url');
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
            this.router.navigateByUrl('/url');
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
