import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AddHospitalRequest, HospitalsArray, HospitalType } from './apiTypes';
import { decodeList, decodeString } from './decoders';
import { makeRequest } from './makeRequest';

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

const decodeHospitalsArray = (data: any): HospitalsArray => {
  if (!data) return [];
  return decodeList(data, decodeHospital);
};

const decodeHospital = (data: any): HospitalType => ({
  name: decodeString(data.name),
  id: decodeString(data.slug),
  logo: decodeString(data.logo),
});
