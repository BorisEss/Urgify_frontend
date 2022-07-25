import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Drawer from '../Drawer';
import HospitalHeader from '../HospitalHeader';

const useStyles = makeStyles()({
  content: {
    marginLeft: 216,
    marginRight: 216,
  },
});

const AddPatientsUi = () => {
  const {classes} = useStyles();

  return (
    <Drawer children={
      <div className={classes.content}>
        <HospitalHeader disablePaddingLeft title="Hospital Pediatric WA – Billings" />
      </div>
    } />
  );
};

export default  AddPatientsUi;
