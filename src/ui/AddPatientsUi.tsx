import React from 'react';
import {makeStyles} from 'tss-react/mui';

import AddPatientWrapper from '../components/AddPatientWrapper';
import CompanyDashboardWrapper from '../components/CompanyDashboardWrapper';
import CompanyHeader from './CompanyHeader';
import DropzonePatients from './DropzonePatients';

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

const AddPatientsUi = () => {
  const {classes} = useStyles();

  return (
    <CompanyDashboardWrapper children={
      <>
        <div className={classes.headerWrap}>
          <CompanyHeader
            title="Company Pediatric WA – Billings"
            disablePaddingLeft
          />
        </div>
        <div className={classes.content}>
          <AddPatientWrapper />
          <div className={classes.contentMargin} />
          <DropzonePatients />
        </div>
      </>
    } />
  );
};

export default  AddPatientsUi;
