import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AddHospitalRequest, HospitalType } from './apiTypes';
import { decodeString } from './decoders';
import { makeRequest } from './makeRequest';

// hospital
export const getHospital = (): AppAsyncThunk<HospitalType> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'hospitals',
      method: 'get',
      path: '/hospitals/',
      isAuth: true,
    }),
  ).then(decodeHospital);
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

// decoders
const decodeHospital = (data: any): HospitalType => ({
  name: decodeString(data.name),
  id: decodeString(data.slug),
  logo: decodeString(data.logo),
});
