import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LanguageService } from '../../../core/service/language.service';
import { LanguageModel } from '../../../core/model/language.model';

@Component({
  selector: 'app-language-edit',
  templateUrl: './language-edit.component.html',
  styleUrls: ['./language-edit.component.scss'],
})
export class LanguageEditComponent implements OnInit {
  model: LanguageModel;
  isEdit = false;
  error: string;

  formGroup = this.formBuilder.group({
    lang_code: ['', Validators.required],
    lang_name: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private service: LanguageService,
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
  }

  getDetail(id: string): any {
    this.service.detail(id).subscribe((data) => {
      this.model = data.payload;

      this.formGroup = this.formBuilder.group({
        lang_code: this.model.lang_code,
        lang_name: this.model.lang_name,
      });
    });
  }

  onSubmit() {
    const data = {
      lang_code: this.formGroup.value.lang_code ?? '',
      lang_name: this.formGroup.value.lang_name ?? '',
    };
    if (this.isEdit) {
      this.service.update(this.model.lang_id || 0, data).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            alert('Successfully updated');
            this.router.navigateByUrl('/language');
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
            this.router.navigateByUrl('/language');
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
