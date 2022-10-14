import { createReducer } from '@reduxjs/toolkit';

import { hospitalActions } from '../actions/hospital';
import type { DepartmentsArray, EmployeesArray, HospitalsArray, HospitalType } from '../api/apiTypes';

export interface HospitalState {
  currentHospital: HospitalType | null;
  hospitals: HospitalsArray;
  departments: DepartmentsArray;
  employees: EmployeesArray;
}

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(hospitalActions.setCurrentHospital, (state, action) => {
    state.currentHospital = action.payload;
  });
  builder.addCase(hospitalActions.setHospitals, (state, action) => {
    state.hospitals = action.payload;
  });
  builder.addCase(hospitalActions.setDepartments, (state, action) => {
    state.departments = action.payload;
  });
  builder.addCase(hospitalActions.setEmployees, (state, action) => {
    state.employees = action.payload;
  });
});

function createInitialState(): HospitalState {
  return {
    currentHospital: null,
    hospitals: [],
    departments: [],
    employees: [],
  };
}
