import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AuthByMailRequest, AuthTokens, RegByMailRequest } from './apiTypes';
import { decodeString } from './decoders';
import { makeRequest } from './makeRequest';

export const authByMail = (
  params: AuthByMailRequest,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/login/withemail',
      isAuth: true,
      params,
    }),
  ).then(decodeTokens);
};

export const registrateByMail = (
  params: RegByMailRequest,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/registrate/withemail',
      isAuth: true,
      params,
    }),
  ).then(decodeTokens);
};

export const refreshTokens = (
  params: AuthTokens,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      method: 'post',
      path: '/token/refresh',
      isAuth: true,
      params,
    }),
  ).then(decodeTokens);
};

const decodeTokens = (data: any): AuthTokens | undefined => {
  if (!data) return undefined;
  return {
    accessToken: decodeString(data.accessToken),
    refreshToken: decodeString(data.refreshToken),
  };
};
