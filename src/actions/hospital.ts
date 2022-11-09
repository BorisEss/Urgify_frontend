import { createAction } from '@reduxjs/toolkit';

import * as api from '../api';
import type { HospitalType } from '../api/apiTypes';
import type { AppAsyncThunk } from './actionsTypes';

export const hospitalActions = {
  setCurrentHospital: createAction('hospitalSetCurrentHospital', (hospital: HospitalType | null) => ({
    payload: hospital,
  })),
};

// company. need to get company by user
export const getHospital = (): AppAsyncThunk<HospitalType | null> => (
  dispatch,
) => {
  return dispatch(api.getHospital())
    .then((response) => {
      if (!response) return null;
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
