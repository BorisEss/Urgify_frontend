import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    backgroundColor: 'transparent',
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    padding: '11px 23px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    lineHeight: '24px',
    borderWidth: 1,
    borderStyle: 'solid',

    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontSize: 12,
      lineHeight: '18px',
      padding: '7px 15px',
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
    borderWidth: 3,
  },
  w100: {
    width: '100%',
  },
  lowerCase: {
    textTransform: 'none',
  },
  gray: {
    color: '#777777',
    borderColor: '#777777',
    '&:hover': {
      color: '#777777',
      borderColor: '#777777',
    },
  },
  orange: {
    color: '#F93922',
    borderColor: '#F93922',
    '&:hover': {
      color: '#DE3922',
      borderColor: '#DE3922',
    },
  },
  flexBtnContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
}));

type ButtonType = {
  color: 'gray' | 'orange';
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
  icon?: React.ReactNode;
  onClick?: () => void; //only for type 'button'
};

const OutlinedButton: React.FC<ButtonType> = ({
  color,
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
  icon,
  onClick,
}) => {
  const {classes, cx} = useStyles();

  if (type === 'button')  return (
    <button
      onClick={() => onClick ? onClick() : null}
      className={cx(
      classes.button,
        disabled || loading ? classes.disabled : '',
        rounded ? classes.rounded : '',
        extraClass,
        bigger ? classes.bigger : '',
        w100 ? classes.w100 : '',
        lowerCase ? classes.lowerCase : '',
        icon ? classes.flexBtnContent : '',
        classes[color]
      )}>
      {icon ? icon : null}
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
        lowerCase ? classes.lowerCase : '',
        classes[color],
      )}
      href={href}
      title={titleAttr}
    >
      {title}
    </a>
  );
};

export default OutlinedButton;
