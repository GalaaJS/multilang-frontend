// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { checkSession } from '../+state/auth.actions';
import { AuthState } from '../+state/auth.reducer';
import { selectAuthState } from '../+state/auth.selectors';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.checkSession().pipe(
      map((data) => {
        if (data.user_id) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
    // return this.store.select(selectAuthState).pipe(
    //   take(1), // Төлөвийг нэг удаа авна
    //   switchMap((authState) => {
    //     if (!authState.isAuthenticated) {
    //       this.store.dispatch(checkSession());
    //       return this.store.select(selectAuthState).pipe(
    //         take(2), // Анхны болон шинэчилсэн төлөвийг авна
    //         map((state) => state.isAuthenticated),
    //         switchMap((isAuthenticated) => {
    //           if (!isAuthenticated) {
    //             this.router.navigate(['/login']);
    //             return of(false);
    //           }
    //           return of(true);
    //         }),
    //         catchError(() => {
    //           this.router.navigate(['/login']);
    //           return of(false);
    //         })
    //       );
    //     }
    //     return of(true);
    //   })
    // );
  }
}
