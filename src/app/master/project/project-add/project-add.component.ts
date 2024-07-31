import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
})
export class ProjectAddComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private location: Location,
    private storeData: Store<any>
  ) {
    this.initForm();
  }

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
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      languages: [''],
      users: [''],
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

  submit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
      this.api.post('/projects', this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.isSubmit = false;
            this.form.reset();
            this.api.showSuccessToast('Project created successfully');
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
