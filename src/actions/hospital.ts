import { createAction } from '@reduxjs/toolkit';

import * as api from '../api';
import type { DepartmentsArray, DepartmentType, HospitalsArray, HospitalType } from '../api/apiTypes';
import type { AppAsyncThunk } from './actionsTypes';

export const hospitalActions = {
  setHospitals: createAction('hospitalSetHospitals', (hospitals: HospitalsArray) => ({
    payload: hospitals,
  })),
  setDepartments: createAction('hospitalSetDepartments', (departments: DepartmentsArray) => ({
    payload: departments,
  })),
};

// hospital

export const getHospitals = (): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.getHospitals())
    .then((response) => {
      if (!response) return;
      dispatch(hospitalActions.setHospitals(response));
    });
};

export const addHospital = (name: string, logo: File): AppAsyncThunk<HospitalType | undefined> => (
  dispatch,
) => {
  return dispatch(api.addHospital({name, logo}))
    .then((response) => {
      if (!response.id) return;
      return response;
    })
    .catch(e => {
      throw e.response.data;
    });
};

// department

export const getDepartments = (hospitalId: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.getDepartments(hospitalId))
    .then((response) => {
      if (!response) return;
      dispatch(hospitalActions.setDepartments(response));
    });
};

export const addDepartments = (hospitalId: string, departmentNames: string[]): AppAsyncThunk<DepartmentsArray | undefined[]> => (
  dispatch,
) => {
  const requests: Promise<DepartmentType>[] = [];
  for (const departmentName of departmentNames) {
    requests.push(dispatch(api.addDepartment(hospitalId, departmentName)));
  }
  return Promise.all(requests);
};


