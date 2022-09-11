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
  return dispatch(api.registrateByMail({ first_name: firstName, last_name: lastName, email, password: password }))
    .then((response) => {
      if (!response) return;
    })
    .catch((e: any) => {
      dispatch(authActions.setErrors(['You have entered incorrect authorization data']));
      if (e && e.response && e.response.data) throw e.response.data;
    });
};

export const confirmEmailCode = (key: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.confirmEmailCode({ key }))
    .then((response) => {
      if (!response) return;
    })
    .catch((e: any) => {
      dispatch(authActions.setErrors(['You have entered incorrect confirmation code']));
      if (e && e.response && e.response.data) throw e.response.data;
    });
};

export const forgotSendMail = (email: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.forgotSendMail({ email }))
    .then((response) => {
      if (!response) return;
    })
    .catch((e) => {
      dispatch(authActions.setErrors(['You have entered incorrect email']));
      throw e.response.data;
    });
};

export const forgotSendPasswords = (new_password1: string, new_password2: string, uid: string, token: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.forgotSendPasswords({ new_password1, new_password2, uid, token }))
    .then((response) => {
      if (!response) return;
    })
    .catch((e) => {
      dispatch(authActions.setErrors(['You have entered invalid password']));
      throw e.response.data;
    });
};

// explore idea
export const submitWaitingList = (email: string): AppAsyncThunk<string> => (
  dispatch,
) => {
  return dispatch(api.submitWaitingList({ email }))
    .then((response) => {
      if (!response) return '';
      return response;
    })
    .catch((e) => {
      throw e.response.data;
    });
};

export const createPaymentIntent = (
  amount: number,
  currency: string,
  payment_method_type: string,
  hospital_name: string,
  email: string,
  invoices: number,
  months: number,
): AppAsyncThunk<string> => (
  dispatch,
) => {
  return dispatch(api.createPaymentIntent({
    amount,
    currency,
    payment_method_types: payment_method_type,
    hospital_name,
    email,
    invoices,
    months,
  }))
    .then((response) => {
      if (!response) return '';
      return response;
    })
    .catch((e) => {
      throw e.response.data;
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
