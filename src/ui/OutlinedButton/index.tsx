import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    backgroundColor: 'transparent',
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    color: '#F93922',
    padding: '11px 23px',
    border: '1px solid #F93922',
    cursor: 'pointer',
    textTransform: 'uppercase',
    lineHeight: '24px',

    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontSize: 12,
      lineHeight: '18px',
      padding: '7px 15px',
    },

    '&:hover': {
      color: '#DE3922',
      border: '1px solid #DE3922',
    },
  },
  disabled: {
    pointerEvents: 'none',
  },
  rounded: {
    borderRadius: 4,
  },
  bigger: {
    padding: '13px 21px',
    border: '3px solid #777777',
    color: '#777777',
  },
  w100: {
    width: '100%',
  },
  lowerCase: {
    textTransform: 'none',
  },
}));

type ButtonType = {
  disabled?: boolean;
  title: string;
  loading?: boolean;
  rounded?: boolean;
  bigger?: boolean;
  w100?: boolean;
  lowerCase?: boolean;
  type?: 'link' | 'button';
  href?: string;// only if use html <a> tag
  titleAttr?: string;// only if use html <a> tag
  extraClass?: string;
};

const OutlinedButton: React.FC<ButtonType> = ({
  disabled,
  title,
  loading,
  rounded,
  type,
  href,
  titleAttr,
  extraClass,
  bigger,
  w100,
  lowerCase,
}) => {
  const {classes, cx} = useStyles();

  if (type === 'button')  return (
    <button className={cx(
      classes.button,
        disabled || loading ? classes.disabled : '',
        rounded ? classes.rounded : '',
        extraClass,
        bigger ? classes.bigger : '',
        w100 ? classes.w100 : '',
        lowerCase ? classes.lowerCase : ''
      )}>
      {title}
    </button>
  );
  return (
    <a
      className={cx(
        classes.button,
        disabled || loading ? classes.disabled : '',
        rounded ? classes.rounded : '',
        extraClass,
        bigger ? classes.bigger : '',
        w100 ? classes.w100 : '',
        lowerCase ? classes.lowerCase : ''
      )}
      href={href}
      title={titleAttr}
    >
      {title}
    </a>
  );
};

export default OutlinedButton;
