import { createReducer } from '@reduxjs/toolkit';

import { hospitalActions } from '../actions/hospital';
import type { DepartmentsArray, HospitalsArray } from '../api/apiTypes';

export interface HospitalState {
  hospitals: HospitalsArray;
  departments: DepartmentsArray;
}

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(hospitalActions.setHospitals, (state, action) => {
    state.hospitals = action.payload;
  });
  builder.addCase(hospitalActions.setDepartments, (state, action) => {
    state.departments = action.payload;
  });
});

function createInitialState(): HospitalState {
  return {
    hospitals: [],
    departments: [],
  };
}
