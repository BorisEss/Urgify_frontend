import { createReducer } from '@reduxjs/toolkit';

import { authActions } from '../actions/auth';

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  errors: string[];
}

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(authActions.setTokens, (state, action) => {
    const { accessToken, refreshToken } = action.payload;
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
  });
  builder.addCase(authActions.setErrors, (state, action) => {
    state.errors = action.payload;
  });
  builder.addCase(authActions.deleteTokens, (state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
  });
});

function createInitialState(): AuthState {
  return {
    accessToken: undefined,
    refreshToken: undefined,
    errors: [],
  };
}
