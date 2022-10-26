import type {Theme} from '@mui/material';
import React from 'react';
import { useRef } from 'react';
import { IMaskInput } from 'react-imask';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
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
  error: {
    border: '2px solid #F93822',
    [theme.breakpoints.down('sm')]: {
      border: '1px solid #F93822',
    },
  },
  label: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,
  },
  errorHelper: {
    fontFamily: 'Poppins-regular',
    fontSize: 12,
    lineHeight: '18px',
    color: '#F93822',
    paddingTop: 3,
  },
}));

type PhoneInputType = {
  inputValue: string;
  onInputChange: (value: string) => void;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  label: string;
};

const PhoneInput: React.FC<PhoneInputType> = ({
  label,
  inputValue,
  onInputChange,
  error,
  errorText,
  disabled,
}) => {
  const {classes, cx} = useStyles();
  const ref = useRef(null);

  return (
  <div>
    <p className={classes.label}>{label}</p>
    <IMaskInput
      className={cx(classes.input, error ? classes.error : '')}
      mask={'{(}000{) }000{-}0000'}
      value={inputValue}
      unmask={true}
      lazy={false}
      ref={ref}
      disabled={disabled}
      onAccept={
        (value) => onInputChange(String(value))}
      overwrite
      eager
    />
    {error && errorText
      ? <p className={classes.errorHelper}>{errorText}</p>
      : null}
  </div>
  );




};

export default PhoneInput;
