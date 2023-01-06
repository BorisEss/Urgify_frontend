import React from 'react';

import Button from '../ui/Buttons/Button';
import Modal from '../ui/Modal';
import NewInvoiceModal from '../ui/NewInvoiceModal';

const CreateNewInvoiceWrapper = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        title="Create new invoice"
        onClick={handleClickOpen}
      />
      <Modal
        open={open}
        handleClose={handleClose}
        borderRadius={4}
        children={
          <NewInvoiceModal handleClose={handleClose}  />
        }
      />
    </>
  );
};

export default CreateNewInvoiceWrapper;
