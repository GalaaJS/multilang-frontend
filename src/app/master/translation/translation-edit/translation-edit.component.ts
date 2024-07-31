import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-translation-edit',
  templateUrl: './translation-edit.component.html',
})
export class TranslationEditComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private location: Location,
    private route: ActivatedRoute,
    private storeData: Store<any>
  ) {}

  translationId = '';
  isSubmit = false;

  form!: FormGroup;

  urls: any[] = [];
  projects: any[] = [];
  columns = [
    {
      key: 'changed_field',
      label: 'Changed field',
    },
    {
      key: 'old_value',
      label: 'Old value',
    },
    {
      key: 'new_value',
      label: 'New value',
    },
    {
      key: 'changed_by',
      label: 'Changed by',
      class: 'ltr:text-right rtl:text-left',
    },
    {
      key: 'changed_at',
      label: 'Changed at',
      class: 'ltr:text-right rtl:text-left',
    },
  ];

  items: any[] = [];

  ngOnInit() {
    this.initForm();

    this.getUrls();
    this.getProjects();

    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.translationId = params.get('id') ?? '';
        this.getItem(this.translationId);
      }
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

  getItem(id: string) {
    this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
    this.api.get(`/translations/${id}`).subscribe((res) => {
      if (res.urls) {
        res.urls = res.urls.split(',');
      }

      if (res.project_ids) {
        res.project_ids = res.project_ids.split(',');
      }

      this.form.patchValue(res);

      if (res.history) {
        this.items = res.history.reverse();
      }
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
    });
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

  submit() {
    this.isSubmit = true;
    if (this.form.valid) {
      console.log(this.form.value);

      this.api
        .put(`/translations/${this.translationId}`, this.form.value)
        .subscribe({
          next: (res) => {
            if (res) {
              this.isSubmit = false;
              this.form.reset();
              this.api.showSuccessToast('Translation updated successfully');
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
