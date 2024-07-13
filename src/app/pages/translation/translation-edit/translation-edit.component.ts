import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslationService } from '../../../core/service/translation.service';
import { TranslationModel } from '../../../core/model/translation.model';
import { LanguageService } from '../../../core/service/language.service';

@Component({
  selector: 'app-translation-edit',
  templateUrl: './translation-edit.component.html',
  styleUrls: ['./translation-edit.component.scss'],
})
export class TranslationEditComponent implements OnInit {
  model: TranslationModel;
  isEdit = false;
  error: string;

  formGroup = this.formBuilder.group({
    lang_id: [0, Validators.required],
    key: ['', Validators.required],
    value: ['', Validators.required],
  });

  langs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: TranslationService,
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
        if (this.langs.length > 0) {
          if (this.formGroup.get('lang_id')!.value === 0) {
            this.formGroup.get('lang_id')?.setValue(this.langs[0].lang_id);
          }
        }
      }
    });
  }

  onLanguageChange(event: any): void {
    this.formGroup.get('lang_id')?.setValue(+event.target.value);
    console.log('language selected', this.formGroup.value.lang_id);
  }

  getDetail(id: string): any {
    this.service.detail(id).subscribe((data) => {
      this.model = data.payload;

      this.formGroup = this.formBuilder.group({
        lang_id: this.model.lang_id ?? 0,
        key: this.model.key,
        value: this.model.value,
      });
    });
  }

  onSubmit() {
    const data = {
      lang_id: this.formGroup.value.lang_id,
      key: this.formGroup.value.key ?? '',
      value: this.formGroup.value.value ?? '',
    };
    if (this.isEdit) {
      this.service.update(this.model.translation_id || 0, data).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            alert('Successfully updated');
            this.router.navigateByUrl('/translation');
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
            this.router.navigateByUrl('/translation');
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
