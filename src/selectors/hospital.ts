import { createSelector } from 'redux-views';

import type { AppState } from '../store';

export const getHospitalState = (state: AppState) => state.hospital;

export const getHospitalsArray = createSelector([getHospitalState], (hospitalState) => {
  return hospitalState.hospitals;
});

export const getDepartmentsArray = createSelector([getHospitalState], (hospitalState) => {
  return hospitalState.departments;
});
