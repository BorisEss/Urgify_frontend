import React from 'react';
import { useParams } from 'react-router-dom';

import HospitalDepartmentsUi from '../../ui/HospitalDepartmentsUi';

const HospitalDepartments = () => {
  let { hospitalId } = useParams();
  // TODO: Here need to add or loader, or empty text. Or simply redirect somewhere if NO hospitalId
  if (hospitalId) return <HospitalDepartmentsUi hospitalId={hospitalId} />;
  return null;
};

export default HospitalDepartments;
