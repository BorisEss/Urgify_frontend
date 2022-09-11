import React from 'react';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles()((_theme) => ({
  main: {
    display:'flex',
    alignItems:'center',
    cursor: 'pointer',

    '&:hover': {
      '& div': {
        '&::after': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: 2,
          left: 0,
          bottom: 8,
          backgroundColor: '#2B364D',
        },
      },
    },
  },
  arrow: {
    width: 32,
    height: 32,
    cursor: 'pointer',
    marginRight: 24,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    color: '#2B364D',
    border: 'none',
    background:'transparent',
    position: 'relative',
  },
}));

type BackButtonType = {
  title: string;
};

const BackButton: React.FC<BackButtonType> = ({title}) => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.main} onClick={() => navigate(-1)}>
      <img className={classes.arrow} src={images.arrowLeft}/>
      <div className={(classes.title)}>{title}</div>
    </div>
  );
};

export default BackButton;
