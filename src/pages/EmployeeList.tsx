import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { getEmployees, getHospital } from '../actions/hospital';
import type { DepartmentType } from '../api/apiTypes';
import { AddDepartmentEmployeeRoute } from '../navigation/navTypes';
import { getCurrentHospital, getEmployeesArray } from '../selectors/hospital';
import { getHospitalsOrDepartmentsOrEmployeeIsFetching } from '../selectors/network';
import type { AppState } from '../store';
import EmployeeListUi from '../ui/EmployeeListUi';

const EmployeeList: React.FC<ReduxProps> = ({
  hospital,
  employees,
  isFetching,
  fetchHospital,
  fetchEmployees,
}) => {
  const navigate = useNavigate();
  let { hospitalId, departmentId } = useParams();
  const currentDepartment: DepartmentType | null = hospital?.departments?.length && departmentId
  ? hospital.departments.filter(item => item.id === departmentId)[0] : null;

  const navigateToAddEmployee = () => {
    navigate(generatePath(AddDepartmentEmployeeRoute(), { hospitalId, departmentId }));
  };

  React.useEffect(() => {
    if (hospitalId && departmentId) {
      fetchHospital(hospitalId);
      fetchEmployees(hospitalId, departmentId);
    }
  }, [fetchHospital, fetchEmployees, hospitalId, departmentId]);
  if (hospitalId && departmentId && currentDepartment && hospital) return (
    <EmployeeListUi
      isFetching={isFetching}
      hospitalName={hospital.name}
      departmentName={currentDepartment.name}
      employees={employees}
      navigateToAddEmployee={navigateToAddEmployee}
    />
  );
  return null;
};

const getData = createSelector(
  [
    getCurrentHospital,
    getEmployeesArray,
    getHospitalsOrDepartmentsOrEmployeeIsFetching,
  ],
  (hospital, employees, isFetching) => {
    return {
      hospital,
      employees,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospital: getHospital,
  fetchEmployees: getEmployees,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(EmployeeList);
