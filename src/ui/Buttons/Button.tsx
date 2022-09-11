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
  rounded: {
    borderRadius: 4,
  },
  round: {
    borderRadius: 24,
  },
  smaller: {
    padding: '12px 24px',
  },
  w100: {
    width: '100%',
  },
}));

type ButtonType = {
  disabled?: boolean;
  title: string;
  loading?: boolean;
  onClick?: () => void;
  rounded?: boolean;
  smaller?: boolean;
  w100?: boolean;
  round?: boolean;
  type?: 'submit' | 'button';
};

const Button: React.FC<ButtonType> = ({
  disabled,
  title,
  loading,
  onClick,
  rounded,
  smaller,
  w100,
  round,
  type,
}) => {
  const {classes, cx} = useStyles();
  return <button
    type={type}
    onClick={onClick}
    className={cx(
    classes.button,
    disabled || loading ? classes.disabled : '',
    rounded ? classes.rounded : '',
    smaller ? classes.smaller : '',
    w100 ? classes.w100 : '',
    round ? classes.round : '',
  )}>{title}</button>;
};

export default Button;
