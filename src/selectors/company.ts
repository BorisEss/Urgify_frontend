import { createSelector } from 'redux-views';

import type { AppState } from '../store';

export const getCompanyState = (state: AppState) => state.company;

export const getCurrentCompany = createSelector([getCompanyState], (companyState) => {
  return companyState.currentCompany;
});
