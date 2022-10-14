import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoaderBox = () => {
  const {classes} = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default LoaderBox;
