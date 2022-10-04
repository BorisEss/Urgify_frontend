import { createAction } from '@reduxjs/toolkit';

import * as api from '../api';
import type { DepartmentsArray, DepartmentType, HospitalsArray, HospitalType } from '../api/apiTypes';
import type { AppAsyncThunk } from './actionsTypes';

export const hospitalActions = {
  setCurrentHospital: createAction('hospitalSetCurrentHospital', (hospital: HospitalType | null) => ({
    payload: hospital,
  })),
  setHospitals: createAction('hospitalSetHospitals', (hospitals: HospitalsArray) => ({
    payload: hospitals,
  })),
  setDepartments: createAction('hospitalSetDepartments', (departments: DepartmentsArray) => ({
    payload: departments,
  })),
};

// hospital

export const getHospital = (hospitalId: string): AppAsyncThunk<HospitalType | null> => (
  dispatch,
) => {
  return dispatch(api.getHospital(hospitalId))
    .then((response) => {
      if (!response) return null;
      dispatch(hospitalActions.setCurrentHospital(response));
      return response;
    });
};

export const getHospitals = (): AppAsyncThunk<HospitalsArray> => (
  dispatch,
) => {
  return dispatch(api.getHospitals())
    .then((response) => {
      if (!response) return [];
      dispatch(hospitalActions.setHospitals(response));
      return response;
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

export const getDepartments = (hospitalId: string): AppAsyncThunk<DepartmentsArray> => (
  dispatch,
) => {
  return dispatch(api.getDepartments(hospitalId))
    .then((response) => {
      if (!response) return [];
      dispatch(hospitalActions.setDepartments(response));
      return response;
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

// Hospitals and Depratments
export const getHospitalsAndDepartments = (): AppAsyncThunk<HospitalsArray> => async (
  dispatch,
) => {
  let hospitals: HospitalsArray | void = await dispatch(api.getHospitals());
  const departmentsRequests: Promise<void>[] = [];
  if (!hospitals || !hospitals.length) return [];

  for (const hospital of hospitals) {
    const departmentsRequest: Promise<void> = dispatch(api.getDepartments(hospital.id))
      .then((departments) => {
        hospital.departments = departments;
      });
    departmentsRequests.push(departmentsRequest);
  }
  await Promise.all(departmentsRequests);
  dispatch(hospitalActions.setHospitals(hospitals));
  return hospitals;
};
