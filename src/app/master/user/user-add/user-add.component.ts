import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private location: Location,
    private storeData: Store<any>
  ) {
    this.initForm();
  }

  isSubmit = false;
  projects: any[] = [];

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.getProjects();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      projects: [''],
    });
  }

  getProjects() {
    this.api.get('/projects').subscribe({
      next: (res) => {
        if (res) {
          this.projects = res;
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

      this.api.post('/users', this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.isSubmit = false;
            this.form.reset();
            this.api.showSuccessToast('User created successfully');
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
