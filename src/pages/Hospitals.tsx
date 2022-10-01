import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { getHospitalsAndDepartments } from '../actions/hospital';
import { AddPatientsRoute, EmployeeDepartmentRoute, HospitalAddDepartmentsRoute } from '../navigation/navTypes';
import { getHospitalsArray } from '../selectors/hospital';
import { getHospitalsOrDepartmentsIsFetching } from '../selectors/network';
import type { AppState } from '../store';
import HospitalsUi from '../ui/HospitalsUi';

const Hospitals:React.FC<ReduxProps> = ({
  isFetching,
  hospitals,
  fetchHospitals,
}) => {
  const navigate = useNavigate();

  const navigateToAddDepartments = (hospitalId: string) => {
    navigate(generatePath(HospitalAddDepartmentsRoute(), { hospitalId }));
  };

  const onDepartmentRemove = (_hospitalId: string, _departmentId: string) => {
    // make request to delete department on special hospital
  };

  const redirectToAddEmployee = (hospitalId: string, departmentId: string) => {
    navigate(generatePath(EmployeeDepartmentRoute(), { hospitalId, departmentId }));
  };

  const redirectToAddPatients = (hospitalId: string, departmentId: string) => {
    navigate(generatePath(AddPatientsRoute(), { hospitalId, departmentId }));
  };

  React.useEffect(() => {
    if (!isFetching) {
      fetchHospitals();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HospitalsUi
    hospitals={hospitals}
    navigateToAddDepartments={navigateToAddDepartments}
    onDepartmentRemove={onDepartmentRemove}
    redirectToAddEmployee={redirectToAddEmployee}
    redirectToAddPatients={redirectToAddPatients}
    isFetching={isFetching}
  />;
};

const getData = createSelector(
  [getHospitalsArray, getHospitalsOrDepartmentsIsFetching],
  (hospitals, isFetching) => {
    return {
      hospitals,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospitals: getHospitalsAndDepartments,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Hospitals);
