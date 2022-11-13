import React from 'react';
import { useParams } from 'react-router-dom';

import AddPatientsListUi from '../ui/AddPatientsListUi';

const AddPatientsList = () => {
  let { companyId } = useParams();

  if (!companyId) return null;
  return <AddPatientsListUi
    companyId={companyId}
  />;
};

export default AddPatientsList;
