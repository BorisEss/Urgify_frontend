import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()({
  submitErrorMessage: {
    fontFamily: 'Poppins-regular',
    fontSize: 12,
    lineHeight: '18px',
    color: '#F93822',
  },
});

type SubmitErrorMessageType = {
  message: any;
};

const SubmitErrorMessage: React.FC<SubmitErrorMessageType> = ({message}) => {
  const {classes} = useStyles();

  return (
    <p className={classes.submitErrorMessage}>
      {message}
    </p>
  );
};

export default SubmitErrorMessage;
