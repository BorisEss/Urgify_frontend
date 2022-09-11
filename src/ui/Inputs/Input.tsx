import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles()((theme: Theme) => ({
  label: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,

    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '18px',
      color: '#777777',
      paddingBottom: 4,
    },
  },
  labelCenter: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,
    textAlign: 'center',
  },
  input: {
    background: '#fff',
    border: '2px solid #DBDBDB',
    borderRadius: 4,
    padding: '14px 22px 14px 14px',
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
    width: '100%',

    '&::placeholder': {
      fontFamily: 'Poppins-semibold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      color: '#B8B8B8',
    },

    [theme.breakpoints.down('sm')]: {
      border: '1px solid #DBDBDB',
      fontFamily: 'Poppins-regular',
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '18px',
      color: '#777777',
      padding: 7,
    },
  },
  darkerPlaceholderColor: {
    '&::placeholder': {
      color: '#777777',
    },
  },
  error: {
    border: '2px solid #F93822',
    [theme.breakpoints.down('sm')]: {
      border: '1px solid #F93822',
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 12,
    bottom: 16,
    cursor: 'pointer',
    lineHeight: 0,
  },
  rootRelative: {
    position: 'relative',
  },
  fullWidth: {
    width: '100%',
  },
}));

type InputType = {
  type: string;
  label: string;
  labelCenter?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onDelete?: () => void;
  placeholder?: string;
  darkerPlaceholderColor?: boolean;
  fullWidth?: boolean;
};

const Input: React.FC<InputType> = ({
  type,
  label,
  name,
  disabled,
  value,
  onChange,
  onBlur,
  error,
  onDelete,
  placeholder,
  labelCenter,
  darkerPlaceholderColor,
}) => {
  const {classes, cx} = useStyles();
  return (
    <div className={cx(onDelete ? classes.rootRelative : '', classes.fullWidth )}>
      <p className={cx(classes.label, labelCenter ? classes.labelCenter : '')}>{label}</p>
      <input
        name={name}
        type={type}
        className={cx(
          classes.input,
          error ? classes.error : '',
          darkerPlaceholderColor ? classes.darkerPlaceholderColor : '',
        )}
        disabled={disabled}
        onChange={(e) => (onChange ? onChange(e) : () => {})}
        onBlur={() => (onBlur ? onBlur() : () => {})}
        value={value}
        placeholder={placeholder}
      />
      {onDelete ? (
        <div onClick={onDelete} className={classes.closeIcon}>
          <img src={images.closeIcon} />
        </div>
      ) : null}
    </div>
  );
};

export default Input;
