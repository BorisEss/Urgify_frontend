import { createSelector } from 'redux-views';

import type { AppState } from '../store';

export const getHospitalState = (state: AppState) => state.hospital;

export const getCurrentHospital = createSelector([getHospitalState], (hospitalState) => {
  return hospitalState.currentHospital;
});

export const getHospitalsArray = createSelector([getHospitalState], (hospitalState) => {
  return hospitalState.hospitals;
});

export const getDepartmentsArray = createSelector([getHospitalState], (hospitalState) => {
  return hospitalState.departments;
});

export const getEmployeesArray = createSelector([getHospitalState], (hospitalState) => {
  return hospitalState.employees;
});
