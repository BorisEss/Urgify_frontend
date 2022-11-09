import { createReducer } from '@reduxjs/toolkit';

import { hospitalActions } from '../actions/hospital';
import type { HospitalType } from '../api/apiTypes';

export interface HospitalState {
  currentHospital: HospitalType | null;
}

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(hospitalActions.setCurrentHospital, (state, action) => {
    state.currentHospital = action.payload;
  });
});

function createInitialState(): HospitalState {
  return {
    currentHospital: null,
  };
}
