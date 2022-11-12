import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import Button from './Buttons/Button';
import OutlinedButton from './Buttons/OutlinedButton';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    backgroundImage: `url(${images.background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center right',
    width: '100%',
    paddingLeft: 112,
    paddingRight: 74,
    paddingBottom: 69,
    minHeight: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 52,
    paddingBottom: 177,
  },
  logo: {
    height: 20,
  },
  headerBtns: {
    display:'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 45,
  },
  contact: {
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    lineHeight: '28px',
    color: '#000000',
    [theme.breakpoints.down(720)]: {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  logIn: {
    padding: '11px 23px',
    border: '1px solid #F93922',
    borderRadius: 4,
  },
  buyNow: {
    paddingBottom: 169,
  },
  buyNowText: {
    paddingBottom: 32,

    '& h2': {
      fontFamily: 'Poppins-semibold',
      fontSize: 72,
      lineHeight: '108px',
      color: '#000000',
    },
  },
  smallText: {
    fontSize: 40,
    lineHeight: '52px',
    color: '#2B364D',
    paddingTop: 8,
    paddingBottom: 32,
  },
  description: {
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    lineHeight: '24px',
    color: '#666666',
    maxWidth: 386,
  },
  buyNowBtns: {
    display: 'flex',
    gap: 24,
  },
  btnsPadding: {
    padding: '11px 23px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialsWrap: {
    display: 'flex',
    gap: 25,
  },
  socials: {
    width: 24,
    height: 24,
  },
  sponsores: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 48,
  },
  sponsoresItem: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
  },
  sponsoresText: {
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    lineHeight: '28px',
    color: '#000000',
  },
  iconWrap: {
    border: '1px solid #DBDBDB',
    borderRadius: 4,
    width: 128,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& img': {
      maxHeight: '100%',
    },
  },
}));

const HomePageUi = () => {
  const {classes} = useStyles();

  return (
    <>
     <div className={classes.container}>
      <div className={classes.header}>
        <img src={images.logo} className={classes.logo} />
        <div className={classes.headerBtns}>
          <a className={classes.contact}>Contact Us</a>
          <OutlinedButton
            extraClass={classes.logIn}
            title="Login"
            color="orange"
            type="button"
          />
        </div>
      </div>
      <div className={classes.buyNow}>
        <div className={classes.buyNowText}>
          <h2>Buy Now, Pay</h2>
          <h4 className={classes.smallText}>later</h4>
          <p className={classes.description}>Meet the most flexible way to pay bills with large expenses associated with them.</p>
        </div>
        <div className={classes.buyNowBtns}>
          <Button
            rounded
            title="BOOK A DEMO"
            extraClass={classes.btnsPadding}
            type="link"
            href="https://meetings.hubspot.com/boris48"
          />
          <OutlinedButton
             title="GET EARLY ACCESS"
             color="orange"
             type="link"
             rounded
             extraClass={classes.btnsPadding}
             href="https://share.hsforms.com/1b1wQ2F89Sb6rcO4vDkaxfQ4yqxj"
            />
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.socialsWrap}>
          <img className={classes.socials} src={images.linkedIn}/>
          <img className={classes.socials} src={images.twitter}/>
        </div>
        <div className={classes.sponsores}>
          <div className={classes.sponsoresItem}>
            <p className={classes.sponsoresText}>Top 10% on:</p>
            <div className={classes.iconWrap}>
              <img src={images.startupSchool}/>
            </div>
          </div>
          <div className={classes.sponsoresItem}>
            <p className={classes.sponsoresText}>Powered by:</p>
            <div className={classes.iconWrap}>
              <img src={images.ibm}/>
            </div>
            <div className={classes.iconWrap}>
              <img src={images.villageCapital}/>
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  );
};

export default HomePageUi;
