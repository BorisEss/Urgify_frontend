import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

import AddCustomerWrapper from '../components/AddCustomerWrapper';
import CompanyDashboardWrapper from '../components/CompanyDashboardWrapper';
import { AddCustomersRoute } from '../navigation/navTypes';
import CompanyHeader from './CompanyHeader';
import SearchInput from './Inputs/SearchInput';
import PaginationControls from './PagintationControls';
import TableCustomers from './TableCustomers';

const useStyles = makeStyles()({
  headerWrap: {
    marginLeft: 216,
  },
  content: {
    marginLeft: 216,
    marginRight: 216,
  },
  tableWrap: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
    marginBottom: 23,
  },
  contentMargin: {
    marginTop: 23,
    width: '100%',
  },
});

type Props = {
  companyId: string,
}

const AddCustomersListUi: React.FC<Props> = ({
  companyId,
}) => {
  const {classes} = useStyles();
  const navigate = useNavigate();

  const navigateToImportPacients = () => {
    navigate(generatePath(AddCustomersRoute(), { companyId }));
  };

  const onChangePage = (page: number) => {
    console.log(page);
    // setPage(page);
    // getRequest
  };
  return (
    <CompanyDashboardWrapper children={
      <>
        <div className={classes.headerWrap}>
          <CompanyHeader
            title="Company Pediatric WA – Billings"
            buttonTitle="Import customers"
            disablePaddingLeft
            onClick={navigateToImportPacients}
          />
        </div>
        <div className={classes.content}>
          <div>
            <AddCustomerWrapper />
            <div className={classes.contentMargin} />
            <SearchInput />
            <div className={classes.tableWrap}>
              <TableCustomers />
            </div>
            <div className={classes.divider} />
            <PaginationControls
              totalProducts={800}
              currentPage={1}
              pageSize={10}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </>
    } />
  );
};

export default  AddCustomersListUi;
