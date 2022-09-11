import React from 'react';
import {makeStyles} from 'tss-react/mui';

import OutlinedButton from './Buttons/OutlinedButton';
import Drawer from './Drawer';
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
  departmentName: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 80,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  button: {
    fontSize: 12,
    lineHeight: '18px',
    color: '#F93822',
    padding: '6px 14px',
    border: '2px solid #F93822',
  },
});

const AddPatientsUi = () => {
  const {classes} = useStyles();

  return (
    <Drawer children={
      <>
        <div className={classes.headerWrap}>
          <HospitalHeader
            title="Hospital Pediatric WA – Billings"
            disablePaddingLeft
          />
        </div>
        <div className={classes.content}>
          <div className={classes.departmentName}>
            <h2 className={classes.title}>Patients</h2>
            <OutlinedButton
              type="button"
              title="Create new"
              color="orange"
              lowerCase
              extraClass={classes.button}
            />
          </div>
          <DropzonePatients />
        </div>
      </>
    } />
  );
};

export default  AddPatientsUi;
