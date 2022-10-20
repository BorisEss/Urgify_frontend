import { createAction } from '@reduxjs/toolkit';

import * as api from '../api';
import type { DepartmentEmployeeType, DepartmentsArray, DepartmentType, EmployeesArray, HospitalsArray, HospitalType } from '../api/apiTypes';
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
  setEmployees: createAction('hospitalSetEmployees', (employees: EmployeesArray) => ({
    payload: employees,
  })),

};

// hospital

export const getHospital = (hospitalId: string): AppAsyncThunk<HospitalType | null> => (
  dispatch,
) => {
  return dispatch(api.getHospital(hospitalId))
    .then((response) => {
      if (!response) return null;
      return dispatch(getDepartments(hospitalId))
        .then(departments => {
          const hospital = { ...response, departments };
          dispatch(hospitalActions.setCurrentHospital(hospital));
          return hospital;
        });
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

export const removeHospital = (hospitalId: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.removeHospital(hospitalId))
    .then((response) => {
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

export const removeDepartment = (hospitalId: string, departmentId: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.removeDepartment(hospitalId, departmentId))
    .then((response) => {
      return response;
    })
    .catch(e => {
      throw e.response.data;
    });
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

// Employee
export const getEmployees = (hospitalId: string, departmentId: string): AppAsyncThunk<EmployeesArray> => (
  dispatch,
) => {
  return dispatch(api.getEmployees(hospitalId, departmentId))
    .then((response) => {
      if (!response) return [];
      dispatch(hospitalActions.setEmployees(response));
      return response;
    });
};

export const addEmployee = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  hospitalId: string,
  departmentId: string,
): AppAsyncThunk<DepartmentEmployeeType | undefined> => (
  dispatch,
) => {
  return dispatch(api.addEmployee({firstName, lastName, email, phone, hospitalId, departmentId}))
    .then((response) => {
      if (!response.id) return;
      return response;
    })
    .catch(e => {
      throw e.response.data;
    });
};
