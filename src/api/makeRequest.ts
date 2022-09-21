import axios, { AxiosRequestConfig } from 'axios';

import type {
  AppAsyncThunk,
  AppAsyncThunkCreator,
} from '../actions/actionsTypes';
import { networkActions } from '../actions/network';
import {
  API_HOST, WITHOUT_API_HOST,
} from '../constants/backend';
import { getApiToken } from '../selectors/auth';
import Log from '../services/logger';
import type { AppState } from '../store';
import type {
  AbortControl,
  ApiResponse,
  Request,
  RequestMeta,
} from './apiTypes';
import { ApiError } from './errors';

const TIMEOUT = 60 * 1000; // request inactivity timeout 1min

let authRefreshing: Promise<void> | undefined;
let authRefreshAction: AppAsyncThunkCreator<any> | undefined;

export const createRequestConfig = (
  request: Request,
  state: AppState,
  isApi: boolean,
): AxiosRequestConfig => {
  const apiHost: string = isApi ? API_HOST : WITHOUT_API_HOST;
  const config: AxiosRequestConfig = {
    method: request.method,
    url: `${apiHost}${request.path}`,
    params: request.query,
    headers: {},
  };

  if (Array.isArray(request.formData)) {
    const formData = new FormData();
    for (const item of request.formData) {
      formData.append(item.name, item.value);
    }
    config.data = formData;
    if (config.headers) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
  } else if (typeof request.params === 'object') {
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    config.data = JSON.stringify(request.params);
  } else {
    config.data = request.params;
  }

  const token = getApiToken(state);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export function createCancelSource(): AbortControl {
  return axios.CancelToken.source();
}

export const makeRequest = (request: Request, isApi: boolean = true): AppAsyncThunk<any> => (
  dispatch,
  getState,
) => {
  const state = getState();
  const requestToken = getApiToken(state);

  const startTimestamp = Date.now();
  const requestInfo = `${request.method} ${request.path}`;
  const requestMeta: RequestMeta = {
    start: startTimestamp,
  };
  const config = createRequestConfig(request, state, isApi);
  if (typeof config.data === 'string') {
    requestMeta.reqSize = config.data.length;
  }

  const sig = request.abortControl || axios.CancelToken.source();
  config.cancelToken = sig.token;

  const onTimeout = () => sig.cancel('timeout');

  let timeoutHandle: ReturnType<typeof setTimeout> | undefined = setTimeout(
    onTimeout,
    config.timeout || TIMEOUT,
  );
  const cleanupTimeout = () => {
    if (!timeoutHandle) return;
    clearTimeout(timeoutHandle);
    timeoutHandle = undefined;
  };

  dispatch(networkActions.requestStarted(request));
  return axios
    .request(config)
    .then((response) => {
      requestMeta.duration = Date.now() - startTimestamp;
      cleanupTimeout();
      requestMeta.respData = response.data;
      requestMeta.respSize = response.headers['content-length'] || 'unknown';
      return extractResponseData(response);
    })
    .catch((error) => {

      if (error.response.status === 401 || error.response.status === 0) {
        const currentToken = getApiToken(getState());

        // If we have not tokens, than we should not got AuthRequired error
        if (!requestToken || !currentToken) throw error;
        if (request.path === '/auth/token/refresh/' && error.response.data && error.response.data && (error.response.data.code === 'token_not_valid')) {
          throw error;
        }
        if (requestToken === currentToken) {
          return dispatch(reauthThenRetry({ ...request, noReauth: true }));
        } else {
          // If we already got next token, then simple retry request
          return dispatch(makeRequest({ ...request, noReauth: true }));
        }
      }

      throw error;
    })
    .then((resp) => {
      Log.debug('api', `${requestInfo} successful`, {
        config,
        requestMeta,
        fullDuration: Date.now() - startTimestamp,
      });
      return resp;
    })
    .finally(() => {
      dispatch(networkActions.requestFinished(request, requestMeta));
    });
};

function extractResponseData(responseData: unknown): any {
  if (!responseData) {
    throw new ApiError('ProtocolError', 'Incorrect server response: empty');
  }
  if (typeof responseData !== 'object' || responseData === null) {
    const e = new ApiError(
      'ProtocolError',
      `Incorrect server response: ${typeof responseData}: '${responseData}'`,
    );
    if (
      typeof responseData === 'string' &&
      /stream was reset|PROTOCOL_ERROR|Software caused connection abort/.test(
        responseData,
      )
    ) {
      e.code = 'NetworkError';
      e.isTemporary = true;
      // e.needsBackoff = true;
    }
    throw e;
  }
  const apiResponse: ApiResponse = responseData as ApiResponse;
  if (apiResponse.status !== 200 && apiResponse.status !== 201) {
    throw new ApiError(
      apiResponse.errorCode || 'UnknownError',
      apiResponse.errors?.join('') || 'Unknown error',
    );
  }
  return apiResponse.data;
}

const reauthThenRetry = (request: Request): AppAsyncThunk<any> => (
  dispatch,
) => {
  if (!authRefreshing) {
    authRefreshing = authRefreshAction
      ? dispatch(authRefreshAction())
      : Promise.resolve();
    authRefreshing.finally(() => {
      authRefreshing = undefined;
    });
  }
  return authRefreshing.then(() => dispatch(makeRequest(request)));
};

export function setAuthRefreshAction(actionCreator: AppAsyncThunkCreator) {
  authRefreshAction = actionCreator;
}
