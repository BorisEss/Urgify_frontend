import React from 'react';

import CompanyTitleBox from '../ui/CompanyTitleBox';
import Modal from '../ui/Modal';
import NewCustomerModal from '../ui/NewCustomerModal';

const AddCustomerWrapper = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CompanyTitleBox
        title="Customers"
        btnTitle="Create new"
        onClick={handleClickOpen}
      />
      <Modal
        open={open}
        handleClose={handleClose}
        borderRadius={4}
        children={
          <NewCustomerModal handleClose={handleClose} />
        }
      />
    </>
  );
};

export default AddCustomerWrapper;
