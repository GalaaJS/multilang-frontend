import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
export const logout = createAction('[Auth] Logout');

export const checkSession = createAction('[Auth] Check Session');

export const checkSessionSuccess = createAction(
  '[Auth] Check Session Success',
  props<{ user: any }>()
);

export const checkSessionFailure = createAction(
  '[Auth] Check Session Failure',
  props<{ error: any }>()
);

export const clearAuthState = createAction('[Auth] Clear Auth State');
