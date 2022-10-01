import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';

const useStyles = makeStyles()((theme: Theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrap: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 40,
    lineHeight: '52px',
    color: '#2B364D',
    paddingLeft: 16,

    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: '34px',
    },
  },
  img: {
    width: 48,
    height: 48,
  },
  image: {
    width: 48,
    height: 48,
  },
  arrowDown: {
    transform: 'rotate(180deg)',
  },
  clickable: {
    cursor: 'pointer',
  },
}));

type DepartmentNameType = {
  title: string;
  onClick?: () => void;
  open?: boolean;
};

const DepartmentName: React.FC<DepartmentNameType> = ({
  title,
  onClick,
  open,
}) => {
  const {classes, cx} = useStyles();
  return (
  <div className={cx(classes.main, onClick ? classes.clickable : '')} onClick={onClick}>
    <div className={classes.wrap}>
      <img className={classes.img} src={images.building}/>
      <h2 className={classes.title}>{title}</h2>
    </div>

    {onClick ?
      <div>
        <img className={cx(classes.image, !open && classes.arrowDown)} src={images.arrowUp}/>
      </div>
      : null
    }
  </div>
  );
};

export default DepartmentName;
