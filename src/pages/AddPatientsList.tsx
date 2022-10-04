import React from 'react';
import { useParams } from 'react-router-dom';

import AddPatientsListUi from '../ui/AddPatientsListUi';

const AddPatientsList = () => {
  let { hospitalId, departmentId } = useParams();

  if (!hospitalId || !departmentId) return null;
  return <AddPatientsListUi
    hospitalId={hospitalId}
    departmentId={departmentId}
  />;
};

export default AddPatientsList;
