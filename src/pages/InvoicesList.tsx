import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { getCompany } from '../actions/company';
import { getCurrentCompany } from '../selectors/company';
import { getCompanyIsFetching } from '../selectors/network';
import type { AppState } from '../store';
import InvoicesListUi from '../ui/InvoicesListUi';
import LoaderBox from '../ui/LoaderBox';

const InvoicesList: React.FC<ReduxProps> = ({
  company,
  isFetching,
  fetchCompany,
}) => {
  let { companyId } = useParams();

  useEffect(() => {
    if (companyId && !company) {
      fetchCompany(companyId);
    }
  }, [company, companyId, fetchCompany]);

  if (isFetching) return <LoaderBox />;

  if (company && companyId) {
    return <InvoicesListUi
      company={company}
    />;
  }
  return null;
};

const getData = createSelector(
  [getCurrentCompany, getCompanyIsFetching],
  (company, isFetching) => {
    return {
      company,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchCompany: getCompany,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(InvoicesList);
