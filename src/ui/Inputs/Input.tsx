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

    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'textfield',
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
    top: 16,
    cursor: 'pointer',
    lineHeight: 0,
  },
  rootRelative: {
    position: 'relative',
  },
  inputWrap: {
    position: 'relative',
  },
  fullWidth: {
    width: '100%',
  },
  errorHelper: {
    fontFamily: 'Poppins-regular',
    fontSize: 12,
    lineHeight: '18px',
    color: '#F93822',
    paddingTop: 3,
    minHeight: 21, // Do this to avoid changing height when error appears/disappers
  },
  leftSymbol: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#2B364D',
    position: 'absolute',
    left: 12,
    top: 16,
  },
  inputWithLeftSymbol: {
    paddingLeft: 21,
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
  errorText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onDelete?: () => void;
  placeholder?: string;
  darkerPlaceholderColor?: boolean;
  fullWidth?: boolean;
  leftSymbol?: string;
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
  errorText,
  onDelete,
  placeholder,
  labelCenter,
  darkerPlaceholderColor,
  leftSymbol,
}) => {
  const {classes, cx} = useStyles();
  return (
    <div className={cx(onDelete ? classes.rootRelative : '', classes.fullWidth )}>
      <p className={cx(classes.label, labelCenter ? classes.labelCenter : '')}>{label}</p>
      <div className={classes.inputWrap}>
        {leftSymbol && <span className={classes.leftSymbol}>{leftSymbol}</span>}
        <input
          name={name}
          type={type}
          className={cx(
            classes.input,
            error ? classes.error : '',
            darkerPlaceholderColor ? classes.darkerPlaceholderColor : '',
            leftSymbol ? classes.inputWithLeftSymbol : '',
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
      {/* Show this everytime to avoid changing height when error appears/disappers */}
      <p className={classes.errorHelper}>{errorText}</p>
    </div>
  );
};

export default Input;
