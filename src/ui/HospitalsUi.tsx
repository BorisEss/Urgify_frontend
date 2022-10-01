import React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { HospitalsArray } from '../api/apiTypes';
import HospitalHeader from './HospitalHeader';
import HospitalToggleItem from './HospitalToggleItem';
import PageName from './PageName';

const useStyles = makeStyles()({
  content: {
    paddingTop: 32,
    paddingBottom: 90,
    marginLeft: 216,
    marginRight: 216,
  },
  pagesNameSpace: {
    paddingBottom: 48,
  },
});

type Props = {
  hospitals: HospitalsArray;
  navigateToAddDepartments: (hospitalId: string) => void;
  onDepartmentRemove: (hospitalId: string, departmentId: string) => void;
  redirectToAddEmployee: (hospitalId: string, departmentId: string) => void;
  redirectToAddPatients: (hospitalId: string, departmentId: string) => void;
  isFetching: boolean;
}

const HospitalsUi: React.FC<Props> = ({
  hospitals,
  navigateToAddDepartments,
  onDepartmentRemove,
  redirectToAddEmployee,
  redirectToAddPatients,
  // isFetching,
}) => {
  const {classes} = useStyles();
  return (
    <div>
      <HospitalHeader buttonTitle="Add another hospital" />
      <div className={classes.content}>
        <div className={classes.pagesNameSpace}>
          <PageName title="Your hospitals" />
        </div>
        {hospitals.length ? hospitals.map(hospital => (
          <HospitalToggleItem
            key={hospital.name}
            hospital={hospital}
            navigateToAddDepartments={navigateToAddDepartments}
            onDepartmentRemove={onDepartmentRemove}
            redirectToAddEmployee={redirectToAddEmployee}
            redirectToAddPatients={redirectToAddPatients}
          />
        )) : null}
      </div>
    </div>
  );
};

export default HospitalsUi;
