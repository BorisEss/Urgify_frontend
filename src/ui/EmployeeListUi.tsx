import React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { EmployeesArray } from '../api/apiTypes';
import BackButton from './Buttons/BackButton';
import Button from './Buttons/Button';
import OutlinedButton from './Buttons/OutlinedButton';
import EmployeesTable from './EmployeesTable';
import HospitalHeader from './HospitalHeader';

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

type Props = {
  isFetching: boolean;
  hospitalName: string;
  departmentName: string;
  employees: EmployeesArray;
  navigateToAddEmployee: () => void;
}

const EmployeeListUi: React.FC<Props> = ({
  // isFetching,
  hospitalName,
  departmentName,
  employees,
  navigateToAddEmployee,
}) => {
  const {classes} = useStyles();

  return (
    <div>
      <HospitalHeader title={hospitalName} />
      <div className={classes.content}>
        <div className={classes.buttonsWrap}>
          <BackButton title={departmentName} />
          <OutlinedButton
            title="Manage department"
            color="gray"
            lowerCase
            type="button"
            extraClass={classes.outlinedExtra}
            />
        </div>
        <div className={classes.divider} />
        <EmployeesTable
          employees={employees}
        />
        <div className={classes.buttonWrap}>
          <Button
            title="Add employee"
            w100
            onClick={navigateToAddEmployee}
          />
        </div>
      </div>
    </div>
  );
};

export default  EmployeeListUi;
