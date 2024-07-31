import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-url-edit',
  templateUrl: './url-edit.component.html',
})
export class UrlEditComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    private location: Location,
    private route: ActivatedRoute,
    private storeData: Store<any>
  ) {}

  urlId = '';
  isSubmit = false;

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.urlId = params.get('id') ?? '';
        this.getItem(this.urlId);
      }
    });
  }

  getItem(id: string) {
    this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
    this.api.get(`/urls/${id}`).subscribe((res) => {
      this.form.patchValue(res);
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
    });
  }

  initForm() {
    this.form = this.fb.group({
      url: ['', Validators.required],
      description: [''],
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
      this.api.put(`/urls/${this.urlId}`, this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.isSubmit = false;
            this.form.reset();
            this.api.showSuccessToast('URL updated successfully');
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
