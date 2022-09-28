import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import {ReactComponent as ArrowRight} from '../../images/arrow-right.svg';

const useStyles = makeStyles()((theme: Theme) => ({
  textButton: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#666666',

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px',
    },
  },
  disabled: {
    pointerEvents: 'none',
    color: '#B8B8B8',
    '& path': {
      fill: '#B8B8B8',
    },
  },
  icon: {
    width: 16,
    height: 16,
  },
  iconTurned: {
    transform: 'rotate(180deg)',
  },
}));

type PaginationButtonType = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  isPrevious?: boolean;
};

const PaginationButton: React.FC<PaginationButtonType> = ({
  title,
  onClick,
  disabled,
  loading,
  isPrevious,
}) => {
  const {classes, cx} = useStyles();

  const onClickHandle = () => {
    if (onClick) onClick();
  };
  return (
    <div
      className={cx(classes.textButton, disabled || loading ? classes.disabled : '')}
      onClick={onClickHandle}>
      {isPrevious && <ArrowRight className={cx(classes.icon, classes.iconTurned)} />}
      <span>{title}</span>
      {!isPrevious && <ArrowRight className={classes.icon} />}
    </div>
  );
};

export default PaginationButton;
