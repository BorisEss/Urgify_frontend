import React from 'react';
import {makeStyles} from 'tss-react/mui';

import BackButton from '../BackButton';
import Button from '../Button';
import HospitalHeader from '../HospitalHeader';
import OutlinedButton from '../OutlinedButton';
import Table from '../Table';

const useStyles = makeStyles()({
  content: {
    paddingTop: 32,
    paddingBottom: 32,
    marginLeft: 216,
    marginRight: 216,
  },
  outlinedExtra: {
    padding: '6px 14px',
    border: '2px solid #777777',
    fontSize: 12,
    lineHeight: '18px',
  },
  buttonsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
    marginTop: 32,
    marginBottom: 24,
  },
  buttonWrap: {
    marginTop: 32,
    width: 292,
  },
});

const EmployeeListUi = () => {
  const {classes} = useStyles();

  return (
    <div>
      <HospitalHeader title="Hospital Pediatric WA" />
      <div className={classes.content}>
        <div className={classes.buttonsWrap}>
          <BackButton title="Admitting" />
          <OutlinedButton
            title="Manage department"
            color="gray"
            lowerCase
            type="button"
            extraClass={classes.outlinedExtra}
            />
        </div>
        <div className={classes.divider} />
        <Table />
        <div className={classes.buttonWrap}>
          <Button
            title="Add employee"
          />
        </div>
      </div>
    </div>
  );
};

export default  EmployeeListUi;
