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

  links: {
    color: '#666666',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

type AuthPageTitleType = {
  title: string;
  subtitle?: React.ReactNode;
};

const AuthPageTitle: React.FC<AuthPageTitleType> = ({title, subtitle}) => {
  const {classes} = useStyles();
  return (
    <>
      <h2 className={classes.title}>{title}</h2>
      {subtitle}
    </>
  );
};

export default AuthPageTitle;
