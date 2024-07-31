import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
})
export class ProjectEditComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private location: Location,
    private route: ActivatedRoute,
    private storeData: Store<any>
  ) {}

  projectId = '';
  isSubmit = false;
  users: any[] = [];

  form!: FormGroup;

  langs = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
  ];

  ngOnInit() {
    this.initForm();
    this.getUsers();
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.projectId = params.get('id') ?? '';
        this.getItem(this.projectId);
      }
    });
  }

  getUsers() {
    this.api.get('/users').subscribe({
      next: (res) => {
        if (res) {
          this.users = res;
        }
      },
      error: (err) => {
        this.api.showErrorToast(err.error);
      },
    });
  }

  getItem(id: string) {
    this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
    this.api.get(`/projects/${id}`).subscribe((res) => {
      if (res.languages) {
        res.languages = res.languages.split(',');
      }
      if (res.users) {
        res.users = res.users.map((item: any) => item.user_id);
      }

      this.form.patchValue(res);
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      languages: [''],
      users: [''],
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.api.put(`/projects/${this.projectId}`, this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.isSubmit = false;
            this.form.reset();
            this.api.showSuccessToast('Project updated successfully');
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
