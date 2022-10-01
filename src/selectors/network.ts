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

export const getHospitalsIsFetching = createSelector([getNetworkState], (state) => {
  const byKey = state.activeRequestsByKey;
  if (!byKey) return false;
  return !!byKey.hospitals;
});

export const getDepartmentsIsFetching = createSelector([getNetworkState], (state) => {
  const byKey = state.activeRequestsByKey;
  if (!byKey) return false;
  return !!byKey.departments;
});

export const getHospitalsOrDepartmentsIsFetching = createSelector([getHospitalsIsFetching, getDepartmentsIsFetching],
  (hospitalsIsFetching, departmentsIsFetching) => {
  return hospitalsIsFetching || departmentsIsFetching;
});
