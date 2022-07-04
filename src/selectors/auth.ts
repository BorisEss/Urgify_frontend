import { createSelector } from 'redux-views';

import type { AppState } from '../store';

export const getAuthState = (state: AppState) => state.auth;

export const getApiToken = (state: AppState) => state.auth.accessToken;
export const getApiRefreshToken = (state: AppState) => state.auth.refreshToken;

export const isAuthenticated = createSelector([getAuthState], (authState) => {
  return !!authState.accessToken;
});

export const getAuthErrors = createSelector(
  [getAuthState],
  (authState) => authState.errors,
);
