import type {Theme} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import LogoutWrapper from '../components/LogoutWrapper';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    justifyContent: 'flex-end',

    [theme.breakpoints.down('sm')]: {
      display: 'unset',
    },
  },
  left: {
    flex: '0 0 58.4%',
    paddingLeft: 48,
    paddingRight: 136,
    paddingTop: 62,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.breakpoints.down(1300)]: {
      paddingRight: 48,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 24,
    },
  },
  leftContent: {
    width: 592,

    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  centeredContent: {
    position: 'relative',
    paddingTop: 0,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 62,

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      paddingBottom: 0,
    },
  },
  right: {
    flex: '0 0 41.6%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    fontSize: 40,
    lineHeight: '52px',
    fontFamily: 'Poppins-semibold',
    background: 'rgba(219, 219, 219, 0.2)',

    '& p': {
      width: 384,

      [theme.breakpoints.down('lg')]: {
        width: 'unset',
      },
    },
  },
}));

type AuthPageWrapperType = {
  children: React.ReactNode;
  rightText?: string;
  centeredContent?: boolean;
  rightExtraClass?: string;
  logout?: boolean;
};

const AuthPageWrapper: React.FC<AuthPageWrapperType> = ({children, rightText, centeredContent, rightExtraClass, logout}) => {
  const {classes, cx} = useStyles();

  const isMobile = useMediaQuery('(max-width:720px)');
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <div className={cx(classes.leftContent, centeredContent ? classes.centeredContent : '')}>{children}</div>
      </div>
      {!isMobile ? (
        <div className={cx(classes.right, rightExtraClass)}>
          {rightText ? <p>{rightText}</p> : null}
        </div>
      ) : null}
      {logout ? <LogoutWrapper /> : null}
    </div>
  );
};

export default AuthPageWrapper;
