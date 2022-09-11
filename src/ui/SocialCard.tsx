import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import {ReactComponent as IdCard} from '../images/id-card.svg';

const useStyles = makeStyles()((_theme) => ({
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 384,
    height: 292,
    alignItems:'center',
    boxShadow:' 0px 5px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
  },
  label: {
    fontFamily: 'Poppins-regular',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
    paddingBottom: 4,
    textTransform: 'uppercase',
  },
  data: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
  },
  socialCard: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width:'100%',
  },
  idIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,

    '& path': {
      fill: ' #777777',
    },
  },
}));

export default function SocialCard() {
  const {classes} = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.socialCard}>
        <IdCard className={classes.idIcon} />
        <h6 className={classes.label}>social security number</h6>
        <p className={classes.data}>111-22-3333</p>
      </div>
    </div>
  );
}
