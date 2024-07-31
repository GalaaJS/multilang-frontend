import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { login } from '../+state/auth.actions';
import { AuthState } from '../+state/auth.reducer';
import { selectError, selectUser } from '../+state/auth.selectors';
import { ApiService } from '../service/api.service';
import { Authenticate } from './authenticate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
export class LoginComponent {
  storeLoading: any;
  constructor(
    private store: Store<AuthState>,
    private storeData: Store<any>,
    private api: ApiService
  ) {
    this.user$ = this.store.select(selectUser);
    this.error$ = this.store.select(selectError);

    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.storeLoading = d;
      });
  }

  user$: Observable<any | null>;
  error$: Observable<any | null>;

  authForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.error$.subscribe((res) => {
      if (res && res.error) {
        this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
        this.api.showErrorToast(res.error);
      }
    });

    this.user$.subscribe((user) => {
      if (user) {
        this.storeData.dispatch({ type: 'toggleMainLoader', payload: false });
        this.api.showSuccessToast('Login successful');
      }
    });
  }

  login() {
    if (this.authForm.valid) {
      this.storeData.dispatch({ type: 'toggleMainLoader', payload: true });
      const authenticate: Authenticate = {
        username: this.authForm.value.username ?? '',
        password: this.authForm.value.password ?? '',
      };

      this.store.dispatch(
        login({
          username: authenticate.username,
          password: authenticate.password,
        })
      );
    }
  }
}
