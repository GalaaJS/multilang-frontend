import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Store } from '@ngrx/store';
import { clearAuthState } from '../+state/auth.actions';
import { AuthState } from '../+state/auth.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  animations: [
    trigger('toggleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class RegisterComponent {
  constructor(
    public storeData: Store<any>,
    private store: Store<AuthState>,
    private api: ApiService,
    private location: Location
  ) {}

  authForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.store.dispatch(clearAuthState());
  }

  register() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
      this.api.post('/auth/register', this.authForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.authForm.reset();
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
