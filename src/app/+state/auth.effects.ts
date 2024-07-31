import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';
import {
  checkSession,
  checkSessionFailure,
  checkSessionSuccess,
  login,
  loginFailure,
  loginSuccess,
} from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService
          .login({ username: action.username, password: action.password })
          .pipe(
            map((user) => loginSuccess({ user })),
            catchError((error) => of(loginFailure({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  checkSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkSession),
      mergeMap(() =>
        this.authService.checkSession().pipe(
          map((user) => {
            console.log(user);
            if (user) {
              return checkSessionSuccess({ user });
            } else {
              return checkSessionFailure({ error: 'User not logged in' });
            }
          }),
          catchError((error) => {
            console.log(error);
            return of(checkSessionFailure({ error }));
          })
        )
      )
    )
  );
}
