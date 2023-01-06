import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AcceptInviteNewUserRequest, AuthByMailRequest, AuthTokens, ConfirmEmailCodeRequest, ForgotSendPasswordsRequest, RegByMailRequest, UserData } from './apiTypes';
import { decodeString } from './decoders';
import { makeRequest } from './makeRequest';

export const authByMail = (
  params: AuthByMailRequest,
): AppAsyncThunk<UserData | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/auth/login/',
      isAuth: true,
      params,
    }),
  ).then(decodeAuthData);
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

export const acceptInviteNewUser = (
  params: AcceptInviteNewUserRequest,
): AppAsyncThunk => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/accounts/accept-invite-new-user/',
      isAuth: true,
      params,
    }),
  );
};

export const acceptInviteExistingUser = (
  hash: string,
): AppAsyncThunk => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'auth',
      method: 'post',
      path: '/accounts/accept-invite-existing-user/',
      isAuth: true,
      params: {
        hash,
      },
    }),
  );
};

export const refreshTokens = (
  params: AuthTokens,
): AppAsyncThunk<AuthTokens | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      method: 'post',
      path: '/auth/token/refresh/',
      isAuth: true,
      params: { refresh: params.refreshToken },
    }),
  ).then(decodeTokens);
};

const decodeAuthData = (data: any): UserData | undefined => {
  if (!data) return undefined;
  return {
    tokens: decodeTokens(data),
    companyId: decodeString(data.company_id),
  };
};

const decodeTokens = (data: any): AuthTokens | undefined => {
  if (!data) return undefined;
  return {
    accessToken: decodeString(data.access_token || data.access),
    refreshToken: decodeString(data.refresh_token || data.refresh),
  };
};
