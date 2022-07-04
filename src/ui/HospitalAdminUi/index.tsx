import type {Theme} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';
import AuthPageTitle from '../AuthPageTitle';
import AuthPageWrapper from '../AuthPageWrapper';
import Button from '../Button';
import Input from '../Input';
import Logo from '../Logo';

const useStyles = makeStyles()((theme: Theme) => ({
  rightPageSide: {
    backgroundImage: `url(${images.adminMainPhoto})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  titleSpacing: {
    paddingTop: 48,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 41,
    },
  },

  welcome: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 40,
    lineHeight: '52px',
    color: '#2B364D',
    paddingBottom: 16,
  },
  subtitle: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    color: '#666666',
    paddingTop: 8,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px',
    },
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'rgba(184, 184, 184, 0.2)',
    marginTop: 32,

    [theme.breakpoints.down('sm')]: {
      marginTop: 24,
    },
  },
  authFormSpacing: {
    paddingTop: 32,

    [theme.breakpoints.down('sm')]: {
      paddingTop: 23,
    },
  },
  changeAuthSpacing: {
    paddingTop: 32,
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  inputFlexBox: {
    display: 'flex',
    gap: 8,
    [theme.breakpoints.down('sm')]: {
      display: 'unset',
    },
  },
  halfInput: {
    flex: '50%',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 16,
    },
  },
  inputSpacing: {
    paddingBottom: 32,

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 16,
    },
  },
  buttonContainer: {
    width: 292,

    [theme.breakpoints.down('lg')]: {
      width: 'auto',
      flex: 1,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingBottom: 16,
    },
  },
}));

const HospitalAdminUi = () => {
  const {classes} = useStyles();

  const navigate = useNavigate();

  const navigateToAddDepartments = () => {
    navigate('/add-departments');
  };

  return (
    <AuthPageWrapper
      centeredContent
      rightExtraClass={classes.rightPageSide}
    >
      <div>
        <div>
          <h2 className={classes.welcome}>Welcome to</h2>
          <Logo />
        </div>
        <div className={classes.titleSpacing}>
          <AuthPageTitle
            title="Let’s add your first hospital"
            subtitle={
              <p className={classes.subtitle}>
                Aliquam convallis nam luctus egestas amet quis ut ac. Aliquet vulputate non elit turpis pellentesque. A cras a elementum faucibus egestas.
              </p>
            }
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.authFormSpacing}>
          <div className={classes.inputSpacing}>
            <Input label="Hospital Name" type="text" />
          </div>
          <div className={classes.buttonContainer}>
            <Button title="Add Hospital" onClick={navigateToAddDepartments} />
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default HospitalAdminUi;
