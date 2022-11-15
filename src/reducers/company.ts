import { createReducer } from '@reduxjs/toolkit';

import { companyActions } from '../actions/company';
import type { CompanyType } from '../api/apiTypes';

export interface CompanyState {
  currentCompany: CompanyType | null;
}

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(companyActions.setCurrentCompany, (state, action) => {
    state.currentCompany = action.payload;
  });
});

function createInitialState(): CompanyState {
  return {
    currentCompany: null,
  };
}
