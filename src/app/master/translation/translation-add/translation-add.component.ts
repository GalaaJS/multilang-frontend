import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-translation-add',
  templateUrl: './translation-add.component.html',
})
export class TranslationAddComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private location: Location,
    private storeData: Store<any>
  ) {
    this.initForm();
  }

  isSubmit = false;

  form!: FormGroup;

  urls: any[] = [];
  projects: any[] = [];

  ngOnInit() {
    this.initForm();

    this.getUrls();
    this.getProjects();
  }

  initForm() {
    this.form = this.fb.group({
      str_english: ['', Validators.required],
      str_french: [''],
      str_spanish: [''],
      urls: [''],
      project_ids: [''],
    });
  }

  getUrls() {
    this.api.get('/urls').subscribe((res: any) => {
      this.urls = res.map((url: any) => {
        return { id: url.url_id, name: url.url };
      });
    });
  }

  getProjects() {
    this.api.get('/projects').subscribe((res: any) => {
      this.projects = res.map((project: any) => {
        return { id: project.project_id, name: project.name };
      });
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
      this.api.post('/translations', this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.isSubmit = false;
            this.form.reset();
            this.api.showSuccessToast('Translation created successfully');
            this.location.back();
          }
          this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
        },
        error: (err) => {
          this.api.showErrorToast(err.error);
          this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
        },
      });
    }
  }
}
