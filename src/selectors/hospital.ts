import { createSelector } from 'redux-views';

import type { AppState } from '../store';

export const getHospitalState = (state: AppState) => state.hospital;

export const getCurrentHospital = createSelector([getHospitalState], (hospitalState) => {
  return hospitalState.currentHospital;
});
