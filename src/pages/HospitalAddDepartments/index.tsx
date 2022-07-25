import React from 'react';
import { useParams } from 'react-router-dom';

import images from '../../images';
import HospitalAddDepartmentsUi from '../../ui/HospitalAddDepartmentsUi';

const HospitalAddDepartments = () => {
  let { hospitalId } = useParams();
  // TODO: Here need to add or loader, or empty text. Or simply redirect somewhere if NO hospitalId
  // hospitalLogo need to get from BE
  if (hospitalId) return <HospitalAddDepartmentsUi hospitalId={hospitalId} hospitalLogo={images.logo} />;
  return null;
};

export default HospitalAddDepartments;
