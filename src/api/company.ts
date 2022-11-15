import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { AddCompanyRequest, CompanyType } from './apiTypes';
import { decodeString } from './decoders';
import { makeRequest } from './makeRequest';

// Company
export const getCompany = (): AppAsyncThunk<CompanyType> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'companies',
      method: 'get',
      path: '/companies/',
      isAuth: true,
    }),
  ).then(decodeCompany);
};

export const addCompany = (params: AddCompanyRequest): AppAsyncThunk<CompanyType> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'company',
      method: 'post',
      path: '/companies/',
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
  ).then(decodeCompany);
};


export const removeCompany = (companyId: string): AppAsyncThunk => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'company',
      method: 'delete',
      path: `/companies/${companyId}/`,
      isAuth: true,
    }),
  );
};

// decoders
const decodeCompany = (data: any): CompanyType => ({
  name: decodeString(data.name),
  id: decodeString(data.slug),
  logo: decodeString(data.logo),
});
