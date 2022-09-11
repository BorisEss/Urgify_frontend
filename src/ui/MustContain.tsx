import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';

const useStyles = makeStyles()((_theme) => ({
  main: {
    flex: 1,
  },
  top: {
    paddingBottom: 8,
    lineHeight: 0,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    color: '#777777',
    lineHeight: '32px',
  },
  description: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    color: '#777777',
    lineHeight: '24px',
  },
  checkedDescription: {
    color: '#2B364D',
  },
  check: {
    width: 32,
    height: 32,
  },
}));

type MustContainType = {
  title: string;
  description: string;
  checked?: boolean;
};

const MustContain: React.FC<MustContainType> = ({
  title,
  description,
  checked,
}) => {
  const {classes, cx} = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.top}>
        { !checked ? <h6 className={classes.title}>{title}</h6> : <img className={classes.check} src={images.circleCheck}/>}
      </div>
      <p className={cx(classes.description, checked ? classes.checkedDescription : '')}>{description}</p>
    </div>
  );
};

export default MustContain;
