import { createSelector } from 'redux-views';

import type { AppState } from '../store';

export const getNetworkState = (state: AppState) => state.network;

export const getAuthorizeIsFetching = createSelector([getNetworkState], (state) => {
  const byKey = state.activeRequestsByKey;
  if (!byKey) return false;
  return !!byKey.auth;
});

export const getExploreIdeaIsFetching = createSelector([getNetworkState], (state) => {
  const byKey = state.activeRequestsByKey;
  if (!byKey) return false;
  return !!byKey.exploreIdea;
});

export const getCompanyIsFetching = createSelector([getNetworkState], (state) => {
  const byKey = state.activeRequestsByKey;
  if (!byKey) return false;
  return !!byKey.company;
});
