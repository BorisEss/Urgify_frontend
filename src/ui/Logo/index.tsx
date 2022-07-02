import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: 207.5,
    height: 40,
    lineHeight: 0,
    objectFit: 'cover',

    [theme.breakpoints.down('sm')]: {
      width: 124.5,
      height: 24,
    },
  },
}));

const Logo = () => {
  const {classes} = useStyles();
  return <img
    className={classes.root}
    src={images.logo}
    alt="logo" />;
};

export default Logo;
