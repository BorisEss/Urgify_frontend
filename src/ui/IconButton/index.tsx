import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((_theme) => ({
  root: {
    lineHeight: 0,
    cursor: 'pointer',
  },
  icon: {
    width: 24,
    height: 24,
  },
}));

type IconButtonType = {
  source: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonType> = ({ source, onClick }) => {
  const {classes} = useStyles();
  return (
    <div onClick={onClick} className={classes.root}>
      <img className={classes.icon} src={source}/>
    </div>
  );
};

export default IconButton;
