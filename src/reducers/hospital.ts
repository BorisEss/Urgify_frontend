import { createReducer } from '@reduxjs/toolkit';

import { hospitalActions } from '../actions/hospital';
import type { HospitalsArray } from '../api/apiTypes';

export interface HospitalState {
  hospitals: HospitalsArray;
}

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(hospitalActions.setHospitals, (state, action) => {
    state.hospitals = action.payload;
  });
});

function createInitialState(): HospitalState {
  return {
    hospitals: [],
  };
}
