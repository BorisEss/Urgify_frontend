import React from 'react';
import { useParams } from 'react-router-dom';

import AddPatientsListUi from '../ui/AddPatientsListUi';

const AddPatientsList = () => {
  let { companyId, departmentId } = useParams();

  if (!companyId || !departmentId) return null;
  return <AddPatientsListUi
    companyId={companyId}
    departmentId={departmentId}
  />;
};

export default AddPatientsList;
