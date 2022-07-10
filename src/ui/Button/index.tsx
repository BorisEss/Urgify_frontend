import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    background: '#F93822',
    fontFamily: 'Poppins-medium',
    fontWeight: 600,
    fontSize: 16,
    color: '#fff',
    padding: '16px 24px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontSize: 12,
      lineHeight: '18px',
      padding: '8px 16px',
    },
  },
  disabled: {
    background: '#B8B8B8',
    pointerEvents: 'none',
  },
}));

type ButtonType = {
  disabled?: boolean;
  title: string;
  loading?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonType> = ({disabled, title, loading, onClick}) => {
  const {classes, cx} = useStyles();
  return <button onClick={onClick} className={cx(classes.button, disabled || loading ? classes.disabled : '')}>{title}</button>;
};

export default Button;
