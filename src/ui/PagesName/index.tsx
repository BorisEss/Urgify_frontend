import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    color: '#2B364D',

    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: '34px',
    },
  },
}));

type PagesNameType = {
  title: string;
};

const PagesName: React.FC<PagesNameType> = ({title}) => {
  const {classes} = useStyles();
  return (
    <>
      <h2 className={classes.title}>{title}</h2>
    </>
  );
};

export default PagesName;
