import { createReducer } from '@reduxjs/toolkit';

import { authActions } from '../actions/auth';
import type { RedirectParamsType } from '../types';

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  authenticated: boolean;
  errors: string[];
  redirectParams?: RedirectParamsType;
  companyId: string;
}

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(authActions.setTokens, (state, action) => {
    const { accessToken, refreshToken } = action.payload;
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
  });
  builder.addCase(authActions.setAuthenticated, (state, action) => {
    state.authenticated = action.payload;
  });
  builder.addCase(authActions.setErrors, (state, action) => {
    state.errors = action.payload;
  });
  builder.addCase(authActions.deleteTokens, (state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
    state.authenticated = false;
  });
  builder.addCase(authActions.setRedirectParams, (state, action) => {
    state.redirectParams = action.payload;
  });
  builder.addCase(authActions.setCompanyId, (state, action) => {
    const companyId = action.payload;
    state.companyId = companyId;
  });
});

function createInitialState(): AuthState {
  return {
    accessToken: undefined,
    refreshToken: undefined,
    authenticated: false,
    errors: [],
    redirectParams: undefined,
    companyId: '',
  };
}
