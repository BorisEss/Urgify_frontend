import type { Theme } from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles<{iconWidth?: number, iconHeight?: number}>()((_theme: Theme, {
  iconWidth,
  iconHeight,
}) => ({
  root: {
    lineHeight: 0,
    cursor: 'pointer',
  },
  icon: {
    width: iconWidth ? iconWidth : 24,
    height: iconHeight ? iconHeight : 24,
  },
}));

type IconButtonType = {
  source: string;
  onClick?: () => void;
  iconWidth?: number;
  iconHeight?: number;
}

const IconButton: React.FC<IconButtonType> = ({
  source,
  onClick,
  iconWidth,
  iconHeight,
}) => {
  const {classes} = useStyles({iconWidth, iconHeight});
  return (
    <div onClick={onClick} className={classes.root}>
      <img className={classes.icon} src={source}/>
    </div>
  );
};

export default IconButton;
