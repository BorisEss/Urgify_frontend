import React from 'react';
import {makeStyles} from 'tss-react/mui';

import HospitalDashboardWrapper from '../components/HospitalDashboardWrapper';
import HospitalHeader from './HospitalHeader';
import HospitalTitleBox from './HospitalTitleBox';
import SearchInput from './Inputs/SearchInput';
import InvoicesListTable from './InvoicesListTable';

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
    paddingBottom: 32,
  },
  contentMargin: {
    marginTop: 23,
    width: '100%',
  },
});

const InvoicesListUi = () => {
  const {classes} = useStyles();

  return (
    <HospitalDashboardWrapper children={
      <>
        <div className={classes.headerWrap}>
          <HospitalHeader
            title="Hospital Pediatric WA – Billings"
            disablePaddingLeft
          />
        </div>
        <div className={classes.content}>
          <div>
            <HospitalTitleBox
              title="Invoices"
              btnTitle="Create new invoice"
              onClick={() => {}}
            />
            <div className={classes.contentMargin} />
            <SearchInput />
            <div className={classes.tableWrap}>
              <InvoicesListTable />
            </div>
          </div>
        </div>
      </>
    } />
  );
};

export default  InvoicesListUi;
