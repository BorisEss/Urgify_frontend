import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import CloseButton from './Buttons/CloseButton';

const useStyles = makeStyles()((_theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '116px 122px',
    position: 'relative',
  },
  closeButtonWrap: {
    position: 'absolute',
    right: 32,
    top: 32,
  },
  checkImg: {
    width: 56,
    height: 56,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
  },
}));

type ConfirmCustomerModalType = {
  handleClose: () => void;
};

const ConfirmCustomerModal: React.FC<ConfirmCustomerModalType> = ({handleClose}) => {
  const {classes} = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.closeButtonWrap}>
        <CloseButton handleClose={handleClose} />
      </div>
      <img className={classes.checkImg} src={images.circleCheck}/>
      <h2 className={classes.title}>Thank you!</h2>
      <p className={classes.subtitle}>Once we’ll launch Urgify you will be notified.</p>
    </div>
  );
};

export default ConfirmCustomerModal;
