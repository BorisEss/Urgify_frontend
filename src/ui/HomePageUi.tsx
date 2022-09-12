import type {Theme} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import OutlinedButton from './Buttons/OutlinedButton';
import ExploreIdea from './ExploreIdea';
import Sticker from './Sticker';

const useStyles = makeStyles()((theme: Theme) => ({
  smallText: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '18px',
    color: '#FFFFFF',
    [theme.breakpoints.down(720)]: {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  bigText: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    [theme.breakpoints.down(720)]: {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  container: {
    padding: '56px 112px',
    position: 'relative',

    [theme.breakpoints.down(1252)]: {
      padding: '40px 44px',
    },

    [theme.breakpoints.up(1024)]: {
      height: '100vh',
    },

    [theme.breakpoints.down(720)]: {
      padding: 24,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',

    [theme.breakpoints.down(1300)]: {
      alignItems: 'flex-start',
    },

    '& img': {
      [theme.breakpoints.down(720)]: {
        width: '124.5px',
      },
    },
  },
  poweredBy: {
    zIndex: 2,

    [theme.breakpoints.up(721)]: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 16,
    },

    [theme.breakpoints.down(720)]: {
      marginBottom: 8,
    },
  },
  topLabels: {
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down(1300)]: {
      flexDirection: 'column',
      alignItems: 'end',
    },
  },
  poweredAndVillageCapital: {
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down(720)]: {
      flexDirection: 'column',
      alignItems: 'end',
    },
  },
  startupSchool: {
    zIndex: 2,

    [theme.breakpoints.up(721)]: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 48,
    },

    [theme.breakpoints.down(1300)]: {
      marginRight: 0,
      marginTop: 16,
    },
  },
  labelText: {
    fontSize: 16,
    lineHeight: '28px',
    marginRight: 16,

    [theme.breakpoints.down(720)]: {
      fontSize: 14,
      lineHeight: '24px',
      marginRight: 0,
      marginBottom: 8,
    },
  },
  imageBox: {
    zIndex: 2,
    lineHeight: 0,
    display: 'block',

    [theme.breakpoints.down(720)]: {
      width: 92,
    },

    '& img': {
      width: '100%',
    },
  },
  main: {
    marginTop: 48,

    [theme.breakpoints.down(1300)]: {
      marginTop: -51,
    },

    [theme.breakpoints.up(1081)]: {
      maxWidth: 592,
    },

    [theme.breakpoints.between(1025, 1080)]: {
      maxWidth: 500,
    },

    [theme.breakpoints.between(721, 1024)]: {
      maxWidth: 400,
    },

    [theme.breakpoints.down(720)]: {
      marginTop: -143,
    },
  },
  title: {
    fontSize: 40,
    lineHeight: '52px',
    color: '#2B364D',
    fontFamily: 'Poppins-semibold',

    [theme.breakpoints.down(720)]: {
      fontSize: 24,
      lineHeight: '34px',
    },

    '& div': {
      marginBottom: 8,
      fontSize: 72,
      lineHeight: '108px',
      color: '#000',
    },
  },
  subtitle: {
    zIndex: 2,
    position: 'relative',
  },
  description: {
    fontSize: 16,
    lineHeight: '28px',
    color: '#666',
    margin: '32px 0',

    [theme.breakpoints.up(721)]: {
      maxWidth: 384,
    },

    [theme.breakpoints.down(720)]: {
      fontSize: 14,
      lineHeight: '24px',
      margin: '16px 0',
    },
  },
  partOf: {
    display: 'flex',
    padding: '56px 0',

    [theme.breakpoints.down(720)]: {
      padding: '40px 0 0',
    },
  },
  info: {
    maxWidth: 384,
    fontSize: 16,
    lineHeight: '28px',
    color: '#666',
    fontFamily: 'Poppins-Regular',
    marginLeft: 24,

    [theme.breakpoints.down(720)]: {
      fontSize: 14,
      lineHeight: '24px',
    },

    '& a': {
      color: '#666',
      textDecoration: 'underline',
    },
  },
  actions: {
    display: 'flex',
  },
  outlinedButtonSpacing: {
    marginLeft: 24,

    [theme.breakpoints.down(720)]: {
      marginLeft: 16,
    },
  },
  pulseBlock: {
    position: 'absolute',
    height: 696,
    width: 696,
    top: 0,
    right: 112,
    zIndex: -1,

    [theme.breakpoints.down(1252)]: {
      right: 44,
    },

    [theme.breakpoints.down(1124)]: {
      width: 536,
      height: 536,
    },

    [theme.breakpoints.down(1024)]: {
      width: 476,
      height: 476,
    },

    [theme.breakpoints.down(720)]: {
      width: 240,
      height: 240,
      right: 24,
    },

    '& img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

      [theme.breakpoints.down(720)]: {
        width: 64,
        height: 64,
      },
    },
  },
  pulse: {
    background: '#F93822',
    height: 696,
    width: 696,
    filter: 'blur(500px)',
    animation: 'flickerAnimation 3s infinite',

    [theme.breakpoints.down(1124)]: {
      width: 536,
      height: 536,
    },

    [theme.breakpoints.down(1024)]: {
      width: 476,
      height: 476,
    },

    [theme.breakpoints.down(720)]: {
      width: 240,
      height: 240,
      filter: 'blur(250px)',
    },
  },
  socials: {
    [theme.breakpoints.up(721)]: {
      position: 'absolute',
      bottom: 112,
      right: 224,
    },

    [theme.breakpoints.down(1024)]: {
      right: 124,
    },

    [theme.breakpoints.down(720)]: {
      display: 'flex',
      marginTop: 45,
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'Poppins-semibold',

    [theme.breakpoints.up(721)]: {
      '&:first-child': {
        marginBottom: 32,
      },
    },

    [theme.breakpoints.down(720)]: {
      padding: '12px 0 12px 12px',
      fontSize: 16,
      lineHeight: '24px',

      '&:first-child': {
        marginRight: 52,
      },
    },

    '&:hover': {
      '& div': {
        [theme.breakpoints.up(721)]: {
          borderBottom: '3px solid #2B364D',
        },
      },
    },

    '& div': {
      [theme.breakpoints.up(721)]: {
        marginLeft: 12,
        borderBottom: '3px solid transparent',
      },
    },
  },
  youtube: {
    [theme.breakpoints.down(720)]: {
      display: 'none',
    },
  },
  linkedin: {
    [theme.breakpoints.down(720)]: {
      display: 'none',
    },
  },
  youtubeMobile: {
    [theme.breakpoints.up(721)]: {
      display: 'none',
    },
    [theme.breakpoints.down(720)]: {
      marginRight: 24,
    },
  },
  linkedinMobile: {
    [theme.breakpoints.up(721)]: {
      display: 'none',
    },
    [theme.breakpoints.down(720)]: {
      marginRight: 24,
    },
  },
}));

const HomePageUi = () => {
  const {classes, cx} = useStyles();
  const isTablet = useMediaQuery('(max-width:1300px)');
  const isMobile = useMediaQuery('(max-width:890px)');

  return (
    <>
      {isMobile ? <Sticker /> : null}
      <div className={classes.container}>
        <header className={classes.header}>
          <img src={images.logo} alt="URGIFY Logo" />
          {!isMobile ? <Sticker /> : null}
          <div className={classes.topLabels}>
            <div className={classes.poweredAndVillageCapital}>
              {!isTablet ? (
                <div className={classes.startupSchool}>
                  <div className={classes.labelText}>Top 10% on:</div>
                  <a
                    href="https://www.startupschool.org"
                    target="_blank"
                    className={cx(classes.imageBox)}
                    rel="noreferrer">
                    <img src={images.startupSchool} alt="startupSchool" />
                  </a>
                </div>
              ) : null}
              <div className={classes.poweredBy}>
                <div className={classes.labelText}>Powered by:</div>
                <a
                  href="https://community.ibm.com/community/user/ibmz-and-linuxone/groups/group-home?CommunityKey=378eb0a9-b968-4c46-ad72-2e1670c4ee92"
                  target="_blank"
                  className={cx(classes.imageBox)}
                  rel="noreferrer">
                  <img src={images.ibm} alt="IBM logo" />
                </a>
              </div>
              <div className={classes.imageBox}>
                <img src={images.villageCapital} alt="Village capital logo" />
              </div>
            </div>
            {isTablet ? (
              <div className={classes.startupSchool}>
                <div className={classes.labelText}>Top 10% on:</div>
                <a
                  href="https://www.startupschool.org"
                  target="_blank"
                  className={cx(classes.imageBox)}
                  rel="noreferrer">
                  <img src={images.startupSchool} alt="startupSchool" />
                </a>
              </div>
            ) : null}
          </div>
        </header>
        <div className={classes.main}>
          <div>
            <div className={classes.title}>
              <div>Hey,</div>
              <p className={classes.subtitle}>We make collecting medical bills easier for hospitals & less stressful for patients.</p>
            </div>
            <div className={classes.description}>
              We believe that great ideas come from everywhere. So, if you would like to get a seat at the table and help us to make a product that you want and create an impact on, please get in touch and submit your idea, and we will make sure we build what matters most to you.
            </div>
            <div className={classes.actions}>
              <ExploreIdea />
              <OutlinedButton
                color="orange"
                rounded
                title="Contact Us"
                type="link"
                href="mailto:boris@urgify.io"
                titleAttr="mailto:boris@urgify.io"
                extraClass={classes.outlinedButtonSpacing}
              />
            </div>
          </div>
          <div className={classes.partOf}>
            <img src={images.ideactionLogo} alt="Ideaction logo" />
            <div className={classes.info}>
              Urgify is part of the <br />{' '}
              <a href="https://ideaction.io" target="_blank" rel="noreferrer">
                IDEACTION Startup Studio family
              </a>
            </div>
          </div>
        </div>
        <div className={classes.pulseBlock}>
          <div className={classes.pulse} />
          <img src={images.plus} alt="Plus icon" />
        </div>
        <div className={classes.socials}>
          <a className={classes.item} href="https://www.linkedin.com/company/urgify" target="_blank" rel="noreferrer">
            <img className={classes.linkedin} src={images.linkedin} alt="Linkedin logo" />
            <img className={classes.linkedinMobile} src={images.linkedinMobile} alt="Linkedin logo" />
            <div>Linkedin</div>
          </a>
          <div className={classes.item}>
            <img className={classes.youtube} src={images.youtube} alt="Youtube logo" />
            <img className={classes.youtubeMobile} src={images.youtubeMobile} alt="Youtube logo" />
            <div>Youtube</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageUi;
