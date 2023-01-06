import React from 'react';

import CompanyTitleBox from '../ui/CompanyTitleBox';
import CreateNewCustomerBtn from '../ui/CreateNewCustomerBtn';
import Modal from '../ui/Modal';
import NewCustomerModal from '../ui/NewCustomerModal';

type Props = {
  withTitle?: boolean;
};

const AddCustomerWrapper:React.FC<Props> = ({
  withTitle,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {withTitle ? (
        <CompanyTitleBox
          title="Customers"
          btnTitle="Create new"
          onClick={handleClickOpen}
        />
      ) : (
        <CreateNewCustomerBtn
          onClick={handleClickOpen}
          title="Create new"
        />
      )}
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
