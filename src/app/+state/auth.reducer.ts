import { Action, createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  checkSession,
  checkSessionSuccess,
  checkSessionFailure,
  clearAuthState,
} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const _authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({
    ...state,
    error: null,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user: user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    error: error,
  })),

  on(logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  })),

  on(checkSession, (state) => ({ ...state, error: null })),
  on(checkSessionSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user,
    error: null,
  })),
  on(checkSessionFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    error,
  })),
  on(clearAuthState, () => initialAuthState)
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
