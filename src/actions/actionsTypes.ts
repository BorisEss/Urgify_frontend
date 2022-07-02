import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { AppState } from '../store';
import type { authActions } from './auth';
import type { networkActions } from './network';

// List of all actions
export type AllActions =
  | NetworkType
  | AuthType;
type ActionTypes<T extends { [K in string]: any }> = ReturnType<T[keyof T]>;

// Actions types
type NetworkType = ActionTypes<typeof networkActions>;
type AuthType = ActionTypes<typeof authActions>;

export type AppThunkDispatch = ThunkDispatch<AppState, unknown, AllActions>;
export type AppThunk<R = void> = ThunkAction<R, AppState, unknown, AllActions>;
export type AppAsyncThunk<R = void> = AppThunk<Promise<R>>;
export type AppThunkCreator<R = void> = () => AppThunk<R>;
export type AppAsyncThunkCreator<R = void> = AppThunkCreator<Promise<R>>;
