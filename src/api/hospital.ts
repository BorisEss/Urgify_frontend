import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AddHospitalRequest, DepartmentsArray, DepartmentType, HospitalsArray, HospitalType } from './apiTypes';
import { decodeList, decodeString } from './decoders';
import { makeRequest } from './makeRequest';

// hospital
export const getHospital = (hospitalId: string): AppAsyncThunk<HospitalType> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'hospitals',
      method: 'get',
      path: `/hospitals/${hospitalId}/`,
      isAuth: true,
    }),
  ).then(decodeHospital);
};

export const getHospitals = (): AppAsyncThunk<HospitalsArray> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'hospitals',
      method: 'get',
      path: '/hospitals/',
      isAuth: true,
    }),
  ).then(decodeHospitalsArray);
};

export const addHospital = (params: AddHospitalRequest): AppAsyncThunk<HospitalType> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'hospitals',
      method: 'post',
      path: '/hospitals/',
      isAuth: true,
      params: {
        name: params.name,
      },
      formData: [
        {
          name: 'logo',
          value: params.logo,
        },
        {
          name: 'name',
          value: params.name,
        },
      ],
    }),
  ).then(decodeHospital);
};

// department

export const getDepartments = (hospitalId: string): AppAsyncThunk<DepartmentsArray> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'departments',
      method: 'get',
      path: `/hospitals/${hospitalId}/departments/`,
      isAuth: true,
    }),
  ).then(decodeDepartmentsArray);
};

export const addDepartment = (hospitalId: string, departmentName: string): AppAsyncThunk<DepartmentType> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'departments',
      method: 'post',
      path: `/hospitals/${hospitalId}/departments/`,
      isAuth: true,
      params: {
        name: departmentName,
      },
    }),
  ).then(decodeDepartment);
};

// decoders
const decodeHospitalsArray = (data: any): HospitalsArray => {
  if (!data) return [];
  return decodeList(data, decodeHospital);
};

const decodeHospital = (data: any): HospitalType => ({
  name: decodeString(data.name),
  id: decodeString(data.slug),
  logo: decodeString(data.logo),
  departments: [],
});

const decodeDepartmentsArray = (data: any): DepartmentsArray => {
  if (!data) return [];
  return decodeList(data, decodeDepartment);
};

const decodeDepartment = (data: any): DepartmentType => ({
  name: decodeString(data.name),
  id: decodeString(data.slug),
});
