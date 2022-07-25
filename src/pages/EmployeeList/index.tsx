import React from 'react';
import { useParams } from 'react-router-dom';

import EmployeeListUi from '../../ui/EmployeeListUi';

const EmployeeList = () => {
  let { hospitalId, departmentId } = useParams();
  if ( hospitalId && departmentId ) return <EmployeeListUi />;
  return null;
};

export default EmployeeList;
