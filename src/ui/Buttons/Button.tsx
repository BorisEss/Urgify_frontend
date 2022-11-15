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
  onClick?: () => void; //only for type 'button'
  rounded?: boolean;
  smaller?: boolean;
  w100?: boolean;
  round?: boolean;
  type?: 'submit' | 'button' | 'link';
  extraClass?: string;
  href?: string;// only if use html <a> tag
  titleAttr?: string;// only if use html <a> tag
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
  extraClass,
  href,
  titleAttr,
}) => {
  const {classes, cx} = useStyles();
  if (type === 'link') return <a
    className={cx(
      classes.button,
      disabled || loading ? classes.disabled : '',
      rounded ? classes.rounded : '',
      smaller ? classes.smaller : '',
      w100 ? classes.w100 : '',
      round ? classes.round : '',
      extraClass,
    )}
    href={href}
    title={titleAttr}
  >
    {title}
  </a>;
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
      extraClass,
    )}
  >{title}</button>;
};

export default Button;
