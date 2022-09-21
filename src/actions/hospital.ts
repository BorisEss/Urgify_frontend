import { createAction } from '@reduxjs/toolkit';

import * as api from '../api';
import type { HospitalsArray, HospitalType } from '../api/apiTypes';
import type { AppAsyncThunk } from './actionsTypes';

export const hospitalActions = {
  setHospitals: createAction('hospitalSetHospitals', (hospitals: HospitalsArray) => ({
    payload: hospitals,
  })),
};

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
