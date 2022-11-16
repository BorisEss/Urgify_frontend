import {Theme, useMediaQuery} from '@mui/material';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
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
    paddingTop: 52,
    minHeight: '100%',

    [theme.breakpoints.up(800)]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    [theme.breakpoints.down(1350)]: {
      backgroundSize: '51%',
      backgroundPositionY: '65%',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 24,
      paddingTop: 20,
    },
    [theme.breakpoints.down(801)]: {
      paddingLeft: 26,
      paddingRight: 29,
      paddingBottom: 26,
      paddingTop: 29,
      background: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 177,
    [theme.breakpoints.down('md')]: {
      paddingBottom: 103,
    },

    [theme.breakpoints.down(801)]: {
      paddingBottom: 57,
    },
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

    [theme.breakpoints.down('md')]: {
      paddingBottom: 170,
    },

    [theme.breakpoints.down(801)]: {
      paddingBottom: 75,
    },
  },
  buyNowText: {
    paddingBottom: 32,

    '& h2': {
      fontFamily: 'Poppins-semibold',
      fontSize: 72,
      lineHeight: '108px',
      color: '#000000',

      [theme.breakpoints.down(801)]: {
        fontSize: 40,
        lineHeight: '60px',
      },
    },

    [theme.breakpoints.down(801)]: {
      paddingBottom: 30,
    },
  },
  smallText: {
    fontSize: 40,
    lineHeight: '52px',
    color: '#2B364D',
    paddingTop: 8,
    paddingBottom: 32,

    [theme.breakpoints.down('md')]: {
      paddingTop: 14,
    },

    [theme.breakpoints.down(801)]: {
      paddingTop: 18,
      paddingBottom: 27,
      fontSize: 24,
      lineHeight: '34px',
    },
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

    [theme.breakpoints.down(801)]: {
      gap: 16,
    },
  },
  btnsPadding: {
    padding: '11px 23px',

    [theme.breakpoints.down(801)]: {
      padding: '7px 15px',
    },
  },
  earlyAccess: {
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down(801)]: {
      // gap: 18
    },
  },
  socialsWrap: {
    display: 'flex',
    gap: 25,
    [theme.breakpoints.down(801)]: {
      justifyContent: 'center',
      marginTop: 32,
      gap: 78,
      width: 235,
    },
  },
  socials: {
    width: 24,
    height: 24,
  },
  sponsores: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 48,

    [theme.breakpoints.down(801)]: {
      gap: 'unset',
      display: 'block',
    },
  },
  sponsoresItem: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',

    [theme.breakpoints.down(801)]: {
      display: 'block',
    },
  },
  sponsoresItemLast: {
    [theme.breakpoints.down(801)]: {
      paddingTop: 19,
    },
  },
  sponsoresText: {
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    lineHeight: '28px',
    color: '#000000',
    [theme.breakpoints.down(801)]: {
      fontSize: 14,
      lineHeight: '28px',
      textAlign: 'center',
    },
  },
  iconWrap: {
    border: '1px solid #DBDBDB',
    borderRadius: 4,
    width: 128,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down(801)]: {
      height: 52,
    },

    '& img': {
      maxHeight: '100%',
    },
  },
  iconWrapLast: {
    [theme.breakpoints.down(801)]: {
      marginTop: 6,
    },
  },
  footerMobileRight: {
    flex: '0 0 235px',
    position: 'relative',
    right: -29,
  },
  footerImage: {
    width: 235,
  },
}));

type Props = {
  redirectToSignIn: () => void;
}

const HomePageUi: React.FC<Props> = ({
  redirectToSignIn,
}) => {
  const {classes, cx} = useStyles();
  const isMobile = useMediaQuery('(max-width:800px)');
  return (
    <>
     <div className={classes.container}>
      <div className={classes.header}>
        <img src={images.logo} className={classes.logo} />
        {!isMobile && (
          <div className={classes.headerBtns}>
            <a
              className={classes.contact}
              href="mailto:boris@urgify.io"
              title="mailto:boris@urgify.io"
            >Contact Us</a>
            <OutlinedButton
              extraClass={classes.logIn}
              onClick={redirectToSignIn}
              title="Login"
              color="orange"
              type="button"
            />
          </div>
        )}
      </div>
      <div className={classes.buyNow}>
        <div className={classes.buyNowText}>
          <h2>Buy Now, Pay</h2>
          <h4 className={classes.smallText}>
            <TypeAnimation
              sequence={[
                'later',
                1000,
                'with family & friends',
                1000,
                'with private capital',
                1000,
                'with investors',
                1000,
                'with equity',
                1000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </h4>
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
             extraClass={cx(classes.btnsPadding, classes.earlyAccess)}
             href="https://share.hsforms.com/1b1wQ2F89Sb6rcO4vDkaxfQ4yqxj"
            />
        </div>
      </div>
      <div className={classes.footer}>
        {!isMobile && (
          <div className={classes.socialsWrap}>
            <a
              href="https://www.linkedin.com/company/urgify"
              target="_blank"
              rel="noreferrer"
            >
              <img className={classes.socials} src={images.linkedIn}/>
            </a>
            <img className={classes.socials} src={images.twitter}/>
          </div>
        )}
        <div className={classes.sponsores}>
          <div className={classes.sponsoresItem}>
            <p className={classes.sponsoresText}>Top 10% on:</p>
            <a
              href="https://www.startupschool.org"
              target="_blank"
              rel="noreferrer"
              className={classes.iconWrap}>
              <img src={images.startupSchool}/>
            </a>
          </div>
          <div className={cx(classes.sponsoresItem, classes.sponsoresItemLast)}>
            <p className={classes.sponsoresText}>Powered by:</p>
            <a
              href="https://community.ibm.com/community/user/ibmz-and-linuxone/groups/group-home?CommunityKey=378eb0a9-b968-4c46-ad72-2e1670c4ee92"
              target="_blank"
              rel="noreferrer"
              className={classes.iconWrap}>
              <img src={images.ibm}/>
            </a>
            <div className={cx(classes.iconWrap, classes.iconWrapLast)}>
              <img src={images.villageCapital}/>
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={classes.footerMobileRight}>
            <img src={images.background} className={classes.footerImage} alt="background" />
            <div className={classes.socialsWrap}>
              <img className={classes.socials} src={images.linkedIn}/>
              <img className={classes.socials} src={images.twitter}/>
            </div>
          </div>
        )}
      </div>
     </div>
    </>
  );
};

export default HomePageUi;
