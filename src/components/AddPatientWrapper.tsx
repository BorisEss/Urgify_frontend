import React from 'react';

import HospitalTitleBox from '../ui/HospitalTitleBox';
import Modal from '../ui/Modal';
import NewPatientModal from '../ui/NewPatientModal';

const AddPatientWrapper = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <HospitalTitleBox
        title="Patients"
        btnTitle="Create new"
        onClick={handleClickOpen}
      />
      <Modal
        open={open}
        handleClose={handleClose}
        borderRadius={4}
        children={
          <NewPatientModal handleClose={handleClose} />
        }
      />
    </>
  );
};

export default AddPatientWrapper;