import { createAction } from '@reduxjs/toolkit';

import * as api from '../api';
import type { AuthTokens } from '../api/apiTypes';
import { getApiRefreshToken, getApiToken } from '../selectors/auth';
import Log from '../services/logger';
import type { AppAsyncThunk, AppThunk } from './actionsTypes';

export const authActions = {
  setTokens: createAction('authSetTokens', (tokens: AuthTokens) => ({
    payload: tokens,
  })),
  deleteTokens: createAction('authDeleteTokens'),
  setErrors: createAction('authSetErrors', (errorMessage: string[]) => ({
    payload: errorMessage,
  })),
};

export const getTokens = (): AppThunk => (dispatch) => {
  const localTokensJSON = localStorage.getItem('auth');
  if (localTokensJSON) {
    const token = JSON.parse(localTokensJSON);
    dispatch(authActions.setTokens(token));
    return Promise.resolve();
  } else return Promise.resolve();
};

export const authByMail = (email: string, password: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.authByMail({ email, password }))
    .then((response) => {
      if (!response) return;
      dispatch(getUserInfoOnTokenUpdate(response));
    })
    .catch(() => {
      dispatch(authActions.setErrors(['You have entered incorrect authorization data']));
    });
};

export const regByMail = (firstName: string, lastName: string, email: string, password: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.registrateByMail({ firstName, lastName, email, password }))
    .then((response) => {
      if (!response) return;
      dispatch(getUserInfoOnTokenUpdate(response));
    })
    .catch(() => {
      dispatch(authActions.setErrors(['You have entered incorrect authorization data']));
    });
};

export const refreshTokens = (): AppAsyncThunk => (dispatch, getState) => {
  const state = getState();
  const accessToken = getApiToken(state);
  const refreshToken = getApiRefreshToken(state);
  if (!accessToken || !refreshToken) {
    Log.debug(
      'auth',
      'requestTokenRefresh: no token or refreshToken found, force logout',
    );
    return Promise.reject();
  }
  return dispatch(api.refreshTokens({ accessToken, refreshToken }))
    .then((res) => {
      if (!res || !res.accessToken) {
        Log.debug(
          'auth',
          'requestTokenRefresh: /token/refresh not return new token, force logout',
        );
        dispatch(authActions.deleteTokens());
        return Promise.resolve();
      }
      return dispatch(saveTokens(res));
    })
    .catch((e) => {
      if (!e.response.data.isSuccess) {
        localStorage.removeItem('auth');
        dispatch(authActions.deleteTokens());
      }
    });
};

export const logout = (): AppThunk => (dispatch) => {
  localStorage.removeItem('auth');
  dispatch(authActions.deleteTokens());
};

export const saveTokens = (response: AuthTokens | undefined): AppAsyncThunk => (
  dispatch,
) => {
  if (!response) return Promise.resolve();
  dispatch(authActions.setTokens(response));
  localStorage.setItem('auth', JSON.stringify(response));
  return Promise.resolve();
};

api.setAuthRefreshAction(refreshTokens);

export const getUserInfoOnTokenUpdate = (response: AuthTokens): AppThunk => (
  dispatch,
) => {
  dispatch(authActions.setTokens(response));
  localStorage.setItem('auth', JSON.stringify(response));
};
