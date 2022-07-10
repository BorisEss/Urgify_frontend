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
}));

type InputType = {
  type: string;
  label: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onDelete?: () => void;
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
}) => {
  const {classes, cx} = useStyles();
  return (
    <div className={cx(onDelete ? classes.rootRelative : '')}>
      <p className={classes.label}>{label}</p>
      <input
        name={name}
        type={type}
        className={cx(classes.input, error ? classes.error : '')}
        disabled={disabled}
        onChange={(e) => (onChange ? onChange(e) : () => {})}
        onBlur={() => (onBlur ? onBlur() : () => {})}
        value={value}
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
