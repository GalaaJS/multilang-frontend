import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-url-add',
  templateUrl: './url-add.component.html',
})
export class UrlAddComponent implements OnInit {
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

  ngOnInit() {
    this.initForm();
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
      this.api.post('/urls', this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.isSubmit = false;
            this.form.reset();
            this.api.showSuccessToast('URL created successfully');
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
