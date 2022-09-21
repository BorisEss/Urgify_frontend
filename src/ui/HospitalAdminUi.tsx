import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import { hospitalNumber } from '../constants/hospitals';
import images from '../images';
import AuthPageTitle from './AuthPageTitle';
import AuthPageWrapper from './AuthPageWrapper';
import Button from './Buttons/Button';
import Dropzone from './Dropzone';
import Input from './Inputs/Input';
import Logo from './Logo';

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
  mainForm: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 32,
  },
  authFormSpacing: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 23,
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
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,
  },
}));

type HospitalAdminUiType = {
  hospitalCount: number;
  isFetching: boolean;
  image: File | null;
  setImage: (image: File | null) => void;
  validate: () => boolean;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hospitalError: string;
};

const HospitalAdminUi:React.FC<HospitalAdminUiType> = ({
  hospitalCount,
  // isFetching,
  image,
  setImage,
  validate,
  onSubmit,
  onInputChange,
  hospitalError,
}) => {
  const {classes} = useStyles();

  return (
    <AuthPageWrapper
      centeredContent
      rightExtraClass={classes.rightPageSide}
      logout
    >
      <div>
        <div>
          <h2 className={classes.welcome}>Welcome to</h2>
          <Logo />
        </div>
        <div className={classes.titleSpacing}>
          <AuthPageTitle
            title={`Let’s add your ${hospitalCount < 20 ? hospitalNumber[hospitalCount + 1] : hospitalCount + 1} hospital`}
            subtitle={
              <p className={classes.subtitle}>
                Aliquam convallis nam luctus egestas amet quis ut ac. Aliquet vulputate non elit turpis pellentesque. A cras a elementum faucibus egestas.
              </p>
            }
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.mainForm}>
        <div className={classes.main}>
          <p className={classes.label}>hospital Logo</p>
          <Dropzone image={image} setImage={setImage} />
        </div>
          <div className={classes.authFormSpacing}>
            <div className={classes.inputSpacing}>
              <Input
                onChange={onInputChange}
                label="Hospital Name"
                type="text"
                name="hospitalName"
                error={!!hospitalError}
              />
            </div>
            <div className={classes.buttonContainer}>
              <Button
                title="Add Hospital"
                onClick={onSubmit}
                disabled={!validate()}
                w100
              />
            </div>
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default HospitalAdminUi;
