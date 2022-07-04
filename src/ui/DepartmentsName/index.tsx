import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles()((theme: Theme) => ({
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
    paddingRight: 16,

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
}));

type DepartmentsNameType = {
  title: string;
};

const DepartmentsName: React.FC<DepartmentsNameType> = ({title}) => {
  const {classes} = useStyles();
  return (
    <div className={classes.wrap}>
      <img className={classes.img} src={images.building}/>
      <h2 className={classes.title}>{title}</h2>
    </div>
  );
};

export default DepartmentsName;
