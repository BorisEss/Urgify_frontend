import { createSelector } from 'redux-views';

import type { AppState } from '../store';

export const getAuthState = (state: AppState) => state.auth;

export const getApiToken = (state: AppState) => state.auth.accessToken;
export const getApiRefreshToken = (state: AppState) => state.auth.refreshToken;

export const isAuthenticated = createSelector([getAuthState], (authState) => {
  return !!authState.accessToken && authState.authenticated;
});

export const getAuthErrors = createSelector(
  [getAuthState],
  (authState) => authState.errors,
);

export const getRedirectAuthParams = createSelector(
  [getAuthState],
  (authState) => authState.redirectParams,
);

export const getUserCompanyId = createSelector(
  [getAuthState],
  (authState) => authState.companyId,
);

