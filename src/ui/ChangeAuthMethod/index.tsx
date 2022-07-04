import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import TextButton from '../TextButton';

const useStyles = makeStyles()((theme: Theme) => ({
  check: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    color: '#666666',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px',
    },
  },
}));
type ChangeAuthMethodType = {
  title: string;
  buttonTitle: string;
  path: string;
  type: string;
  disabled?: boolean;
  loading?: boolean;
};

const ChangeAuthMethod: React.FC<ChangeAuthMethodType> = ({title, buttonTitle, path, disabled, loading}) => {
  const {classes} = useStyles();
  return (
    <p className={classes.check}>
      {title}&nbsp;
      <TextButton disabled={disabled} loading={loading} type="link" path={path} color="orange" title={buttonTitle} />
    </p>
  );
};

export default ChangeAuthMethod;
