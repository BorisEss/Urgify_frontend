import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import TextButton from './Buttons/TextButton';

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
  path?: string;
  type?: 'link' | 'button';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
};

const ChangeAuthMethod: React.FC<ChangeAuthMethodType> = ({
  title,
  buttonTitle,
  path,
  type = 'link',
  disabled,
  loading,
  href,
}) => {
  const {classes} = useStyles();
  return (
    <p className={classes.check}>
      {title}&nbsp;
      <TextButton
        disabled={disabled}
        loading={loading}
        type={type}
        path={path}
        color="orange"
        title={buttonTitle}
        href={href}
      />
    </p>
  );
};

export default ChangeAuthMethod;
