import React from 'react';
import {makeStyles} from 'tss-react/mui';

import AddCustomerWrapper from '../components/AddCustomerWrapper';
import CompanyDashboardWrapper from '../components/CompanyDashboardWrapper';
import CompanyHeader from './CompanyHeader';
import DropzoneCustomers from './DropzoneCustomers';

const useStyles = makeStyles()({
  headerWrap: {
    marginLeft: 216,
  },
  content: {
    marginLeft: 216,
    marginRight: 216,
    marginBottom: 80,
  },
  contentMargin: {
    marginTop: 87,
    width: '100%',
  },
});

const AddCustomersUi = () => {
  const {classes} = useStyles();

  return (
    <CompanyDashboardWrapper children={
      <>
        <div className={classes.headerWrap}>
          <CompanyHeader
            title="ABC Company"
            disablePaddingLeft
          />
        </div>
        <div className={classes.content}>
          <AddCustomerWrapper />
          <div className={classes.contentMargin} />
          <DropzoneCustomers />
        </div>
      </>
    } />
  );
};

export default  AddCustomersUi;
