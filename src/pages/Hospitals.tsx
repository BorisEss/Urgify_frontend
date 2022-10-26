import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { getHospitalsAndDepartmentsAndEmployees, removeDepartment, removeHospital } from '../actions/hospital';
import { AddDepartmentEmployeeRoute, AddPatientsRoute, EmployeeListRoute, HospitalAddDepartmentsRoute } from '../navigation/navTypes';
import { getHospitalsArray } from '../selectors/hospital';
import { getHospitalsOrDepartmentsOrEmployeeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import HospitalsUi from '../ui/HospitalsUi';

const Hospitals:React.FC<ReduxProps> = ({
  isFetching,
  hospitals,
  fetchHospitals,
  fetchRemoveDepartment,
  fetchRemoveHospital,
}) => {
  const navigate = useNavigate();

  const onHospitalRemove = (hospitalId: string) => {
    fetchRemoveHospital(hospitalId)
      .then(() => {
        fetchHospitals();
      })
      .catch(() => {
        Log.message('Cannot remove hospital');
      });
  };

  const onDepartmentRemove = (hospitalId: string, departmentId: string) => {
    fetchRemoveDepartment(hospitalId, departmentId)
      .then(() => {
        fetchHospitals();
      })
      .catch(() => {
        Log.message('Cannot remove department');
      });
  };

  // Redirects
  const redirectToAddDepartments = (hospitalId: string) => {
    navigate(generatePath(HospitalAddDepartmentsRoute(), { hospitalId }));
  };

  const redirectToAddEmployee = (hospitalId: string, departmentId: string) => {
    navigate(generatePath(AddDepartmentEmployeeRoute(), { hospitalId, departmentId }));
  };

  const redirectToAddPatients = (hospitalId: string, departmentId: string) => {
    navigate(generatePath(AddPatientsRoute(), { hospitalId, departmentId }));
  };
  const redirectToEmployeesList = (hospitalId: string, departmentId: string) => {
    navigate(generatePath(EmployeeListRoute(), { hospitalId, departmentId }));
  };

  React.useEffect(() => {
    if (!isFetching) {
      fetchHospitals();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HospitalsUi
    hospitals={hospitals}
    onDepartmentRemove={onDepartmentRemove}
    redirectToAddDepartments={redirectToAddDepartments}
    redirectToAddEmployee={redirectToAddEmployee}
    redirectToAddPatients={redirectToAddPatients}
    redirectToEmployeesList={redirectToEmployeesList}
    isFetching={isFetching}
    onHospitalRemove={onHospitalRemove}
  />;
};

const getData = createSelector(
  [getHospitalsArray, getHospitalsOrDepartmentsOrEmployeeIsFetching],
  (hospitals, isFetching) => {
    return {
      hospitals,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospitals: getHospitalsAndDepartmentsAndEmployees,
  fetchRemoveDepartment: removeDepartment,
  fetchRemoveHospital: removeHospital,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Hospitals);
