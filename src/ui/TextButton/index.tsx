import type {Theme} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  textButton: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',

    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    position: 'relative',

    '&::after': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: 1,
      left: 0,
      bottom: 4,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px',
    },
  },
  gray: {
    color: '#666666',
    '&::after': {
      background: '#666666',
    },
    '&:hover': {
      '&::after': {
        background: 'transparent',
      },
    },
  },
  orange: {
    color: '#F93822',
    '&::after': {
      background: '#F93822',
    },
    '&:hover': {
      '&::after': {
        background: 'transparent',
      },
    },
  },
  disabled: {
    pointerEvents: 'none',
  },
}));

type TextButtonType = {
  title: string;
  color: 'gray' | 'orange';
  onClick?: () => void; //only for type 'button'
  type?: 'link' | 'button';
  path?: string; //only for type 'link'
  disabled?: boolean;
  loading?: boolean;
};

const TextButton: React.FC<TextButtonType> = ({title, color, onClick, type = 'button', path, disabled, loading}) => {
  let navigate = useNavigate();
  const {classes, cx} = useStyles();

  const onClickHandle = () => {
    if (onClick) onClick();
    if (type === 'link' && path) navigate(path);
  };
  return (
    <button
      className={cx(classes.textButton, classes[color], disabled || loading ? classes.disabled : '')}
      onClick={onClickHandle}>
      {title}
    </button>
  );
};

export default TextButton;
