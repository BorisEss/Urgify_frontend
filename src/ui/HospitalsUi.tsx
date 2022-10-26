import React from 'react';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

import type { HospitalsArray } from '../api/apiTypes';
import { HospitalAdminRoute } from '../navigation/navTypes';
import { checkHospitalsLimit } from '../utils/loginRedirectFlow';
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
  redirectToAddDepartments: (hospitalId: string) => void;
  onDepartmentRemove: (hospitalId: string, departmentId: string) => void;
  redirectToAddEmployee: (hospitalId: string, departmentId: string) => void;
  redirectToAddPatients: (hospitalId: string, departmentId: string) => void;
  redirectToEmployeesList: (hospitalId: string, departmentId: string) => void;
  isFetching: boolean;
  onHospitalRemove: (hospitalId: string) => void;
}

const HospitalsUi: React.FC<Props> = ({
  hospitals,
  onDepartmentRemove,
  redirectToAddDepartments,
  redirectToAddEmployee,
  redirectToAddPatients,
  redirectToEmployeesList,
  onHospitalRemove,
  // isFetching,
}) => {
  const {classes} = useStyles();
  const navigate = useNavigate();

  const navigateToHospitalAdmin = () => {
    navigate(HospitalAdminRoute());
  };

  const showAddHospitalButton = !checkHospitalsLimit(hospitals.length);
  return (
    <div>
      <HospitalHeader
        buttonTitle={showAddHospitalButton ? 'Add another hospital' : ''}
        onClick={navigateToHospitalAdmin}
      />
      <div className={classes.content}>
        <div className={classes.pagesNameSpace}>
          <PageName title="Your hospitals" />
        </div>
        {hospitals.length ? hospitals.map(hospital => (
          <HospitalToggleItem
            key={hospital.name}
            hospital={hospital}
            onDepartmentRemove={onDepartmentRemove}
            redirectToAddDepartments={redirectToAddDepartments}
            redirectToAddEmployee={redirectToAddEmployee}
            redirectToAddPatients={redirectToAddPatients}
            redirectToEmployeesList={redirectToEmployeesList}
            onHospitalRemove={onHospitalRemove}
          />
        )) : null}
      </div>
    </div>
  );
};

export default HospitalsUi;
