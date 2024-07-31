import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private location: Location,
    private route: ActivatedRoute,
    private storeData: Store<any>
  ) {}

  user_id = '';
  isSubmit = false;

  projects: any = [];

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.getProjects();
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.user_id = params.get('id') ?? '';
        this.getItem(this.user_id);
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: [''],
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

  getItem(id: string) {
    this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
    this.api.get(`/users/${id}`).subscribe((res) => {
      if (res.projects) {
        res.projects = res.projects.map((item: any) => item.project_id);
      }
      this.form.patchValue(res);
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
      this.api.put(`/users/${this.user_id}`, this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.isSubmit = false;
            this.form.reset();
            this.api.showSuccessToast('User updated successfully');
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
