import { createAction } from '@reduxjs/toolkit';

import * as api from '../api';
import type { CompanyType } from '../api/apiTypes';
import type { AppAsyncThunk } from './actionsTypes';

export const companyActions = {
  setCurrentCompany: createAction('companySetCurrentCompany', (company: CompanyType | null) => ({
    payload: company,
  })),
};

// company. need to get company by user
export const getCompany = (): AppAsyncThunk<CompanyType | null> => (
  dispatch,
) => {
  return dispatch(api.getCompany())
    .then((response) => {
      if (!response) return null;
      return response;
    });
};

export const addCompany = (name: string, logo: File): AppAsyncThunk<CompanyType | undefined> => (
  dispatch,
) => {
  return dispatch(api.addCompany({name, logo}))
    .then((response) => {
      if (!response.id) return;
      return response;
    })
    .catch(e => {
      throw e.response.data;
    });
};

export const removeCompany = (companyId: string): AppAsyncThunk => (
  dispatch,
) => {
  return dispatch(api.removeCompany(companyId))
    .then((response) => {
      return response;
    })
    .catch(e => {
      throw e.response.data;
    });
};
