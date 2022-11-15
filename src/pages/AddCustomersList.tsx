import React from 'react';
import { useParams } from 'react-router-dom';

import AddCustomersListUi from '../ui/AddCustomersListUi';

const AddCustomersList = () => {
  let { companyId } = useParams();

  if (!companyId) return null;
  return <AddCustomersListUi
    companyId={companyId}
  />;
};

export default AddCustomersList;
