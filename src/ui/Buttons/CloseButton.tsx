import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles()((_theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  action: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
  },
  icon: {
    width: 32,
    height: 32,
    color: '#777777',
  },
}));

type CloseButtonType = {
  handleClose: () => void;
};

const CloseButton: React.FC<CloseButtonType> = ({handleClose}) => {
  const {classes} = useStyles();
  return (
    <div className={classes.main} onClick={handleClose}>
      <p className={classes.action}>Close</p>
      <img className={classes.icon} src={images.closeIcon}/>
    </div>
  );
};

export default CloseButton;
