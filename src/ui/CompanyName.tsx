import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import IconButton from './Buttons/IconButton';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  main: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrap: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 40,
    lineHeight: '52px',
    color: '#2B364D',
    paddingLeft: 16,

    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontWeight: 600,
      fontSize: 24,
      lineHeight: '34px',
    },
  },
  img: {
    width: 48,
    height: 48,
  },
  image: {
    width: 48,
    height: 48,
  },
  arrowDown: {
    transform: 'rotate(180deg)',
  },
  clickable: {
    cursor: 'pointer',
  },
  removeBox: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: -30,
  },
}));

type CompanyNameType = {
  title: string;
  onClick?: () => void;
  open?: boolean;
  onRemoveClick?: () => void;
};

const CompanyName: React.FC<CompanyNameType> = ({
  title,
  onClick,
  open,
  onRemoveClick,
}) => {
  const {classes, cx} = useStyles();
  return (
  <div className={classes.root}>
    <div className={cx(classes.main, onClick ? classes.clickable : '')} onClick={onClick}>
      <div className={classes.wrap}>
        <img className={classes.img} src={images.building}/>
        <h2 className={classes.title}>{title}</h2>
      </div>

      {onClick ?
        <div>
          <img className={cx(classes.image, !open && classes.arrowDown)} src={images.arrowUp}/>
        </div>
        : null
      }
    </div>
    {onRemoveClick ? (
      <div className={classes.removeBox}>
        <IconButton
          onClick={() => onRemoveClick()}
          source={images.trashCan}
          iconWidth={28}
          iconHeight={28}
        />
      </div>
    ) : null}
  </div>
  );
};

export default CompanyName;
