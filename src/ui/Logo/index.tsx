import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles<{width?: number, height?: number}>()((theme: Theme, { width,height}) => ({
  root: {
    width: width ? width : 207.5,
    height: height ? height : 40,
    lineHeight: 0,
    objectFit: 'cover',

    [theme.breakpoints.down('sm')]: {
      width: 124.5,
      height: 24,
    },
  },
}));

type LogoPropsType = {
  width?: number,
  height?: number,
};

const Logo: React.FC<LogoPropsType> = ({width, height}) => {
  const {classes} = useStyles({width, height});
  return <img
    className={classes.root}
    src={images.logo}
    alt="logo" />;
};

export default Logo;
