import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AuthByMailRequest, AuthTokens, ConfirmEmailCodeRequest, ForgotSendPasswordsRequest, RegByMailRequest } from './apiTypes';
import { decodeString } from './decoders';
import { makeRequest } from './makeRequest';

export const authByMail = (
  params: AuthByMailRequest,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/auth/login/',
      isAuth: true,
      params,
    }),
  ).then(decodeTokens);
};

export const registrateByMail = (
  params: RegByMailRequest,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  const payload = {
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    password1: params.password,
    password2: params.password,
  };
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/auth/register/',
      isAuth: true,
      params: payload,
    }),
  ).then(decodeTokens);
};

export const confirmEmailCode = (
  params: ConfirmEmailCodeRequest,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/auth/account-confirm-email/',
      isAuth: true,
      params,
    }),
  ).then(decodeTokens);
};

export const forgotSendMail = (
  params: {email: string},
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/auth/password-reset/',
      isAuth: true,
      params,
    }),
  ).then(decodeTokens);
};

export const forgotSendPasswords = (
  params: ForgotSendPasswordsRequest,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/auth/password-reset-confirm/',
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
    accessToken: decodeString(data.access_token),
    refreshToken: decodeString(data.refresh_token),
  };
};
