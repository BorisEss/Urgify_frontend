import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { getHospitalsAndDepartments, removeDepartment, removeHospital } from '../actions/hospital';
import { AddDepartmentEmployeeRoute, AddPatientsRoute, HospitalAddDepartmentsRoute } from '../navigation/navTypes';
import { getHospitalsArray } from '../selectors/hospital';
import { getHospitalsOrDepartmentsIsFetching } from '../selectors/network';
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

  const navigateToAddDepartments = (hospitalId: string) => {
    navigate(generatePath(HospitalAddDepartmentsRoute(), { hospitalId }));
  };

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

  const redirectToAddEmployee = (hospitalId: string, departmentId: string) => {
    navigate(generatePath(AddDepartmentEmployeeRoute(), { hospitalId, departmentId }));
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
    onHospitalRemove={onHospitalRemove}
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
  fetchRemoveDepartment: removeDepartment,
  fetchRemoveHospital: removeHospital,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Hospitals);