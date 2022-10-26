import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AddEmployeeRequest, AddHospitalRequest, DepartmentEmployeeType, DepartmentsArray, DepartmentType, EmployeesArray, HospitalsArray, HospitalType } from './apiTypes';
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
      key: 'hospital',
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


export const removeHospital = (hospitalId: string): AppAsyncThunk => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'hospital',
      method: 'delete',
      path: `/hospitals/${hospitalId}/`,
      isAuth: true,
    }),
  );
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

export const removeDepartment = (hospitalId: string, departmentId: string): AppAsyncThunk => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'departments',
      method: 'delete',
      path: `/hospitals/${hospitalId}/departments/${departmentId}/`,
      isAuth: true,
    }),
  );
};

// employee
export const addEmployee = (params: AddEmployeeRequest): AppAsyncThunk<DepartmentEmployeeType> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'employee',
      method: 'post',
      path: `/accounts/invite-member/${params.hospitalId}/${params.departmentId}/`,
      isAuth: true,
      params: {
        first_name: params.firstName,
        last_name: params.lastName,
        email: params.email,
        phone: params.phone ? params.phone : undefined,
      },
    }),
  ).then(decodeEmployee);
};

export const getEmployees = (hospitalId: string, departmentId: string): AppAsyncThunk<EmployeesArray> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'employee',
      method: 'get',
      path: `/hospitals/${hospitalId}/departments/${departmentId}/employee/`,
      isAuth: true,
    }),
  ).then(decodeEmployeesArray);
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
  employees: [],
});

const decodeEmployeesArray = (data: any): EmployeesArray => {
  if (!data) return [];
  return decodeList(data, decodeEmployee);
};

const decodeEmployee = (data: any): DepartmentEmployeeType => ({
  id: decodeString(data.id),
  fullName: decodeString(data.user),
  email: decodeString(data.email),
  status: decodeString(data.status),
  phone: decodeString(data.phone),
  attribution: decodeString(data.attribution),
});
