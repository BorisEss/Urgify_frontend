import React from 'react';
import {makeStyles} from 'tss-react/mui';

import AddPatientWrapper from '../components/AddPatientWrapper';
import HospitalDashboardWrapper from '../components/HospitalDashboardWrapper';
import DropzonePatients from './DropzonePatients';
import HospitalHeader from './HospitalHeader';

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
    <HospitalDashboardWrapper children={
      <>
        <div className={classes.headerWrap}>
          <HospitalHeader
            title="Hospital Pediatric WA – Billings"
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
