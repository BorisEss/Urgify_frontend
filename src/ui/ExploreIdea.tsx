import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

import Button from './Buttons/Button';
import ExploreIdeaModal from './ExploreIdeaModal';
import Modal from './Modal';

const ExploreIdea = () => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:720px)');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        title="EXPLORE THE IDEA"
        onClick={handleClickOpen}
        rounded
        smaller={!isMobile}
      />
      <Modal
        open={open}
        handleClose={handleClose}
        children={
          <ExploreIdeaModal handleClose={handleClose} />
        }
      />
    </>
  );
};

export default ExploreIdea;
