import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';

const useStyles = makeStyles()((theme: Theme) => ({
  stickerWrapper: {
    position: 'absolute',
    zIndex: 0,
    top: -68,
    left: 312,

    [theme.breakpoints.down(1380)]: {
      left: 263,
    },

    [theme.breakpoints.down(1252)]: {
      top: -52,
    },

    [theme.breakpoints.down(890)]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      left: 'unset',
      top: 40,
    },
  },
  stickerContainer: {
    position: 'relative',
    lineHeight: 0,
  },
  stickerText: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    userSelect: 'none',
  },
  smallText: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '18px',
    color: '#FFFFFF',
    [theme.breakpoints.down(720)]: {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  bigText: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    [theme.breakpoints.down(720)]: {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  stickerImage: {
    [theme.breakpoints.down(720)]: {
      width: 104,
      height: 104,
    },
  },
}));

const Sticker = () => {
  const {classes} = useStyles();
  return (
    <div className={classes.stickerWrapper}>
      <div className={classes.stickerContainer}>
        <div className={classes.stickerText}>
          <p className={classes.smallText}>Save now</p>
          <p className={classes.bigText}>PRE-ORDER</p>
        </div>
        <img src={images.sticker} className={classes.stickerImage} />
      </div>
    </div>
  );
};

export default Sticker;
