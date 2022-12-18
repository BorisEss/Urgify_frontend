import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

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
    gap: 32,
  },
  authFormSpacing: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 23,
    },
  },
  inputSpacing: {
    paddingBottom: 11,

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
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

type CompanyAdminUiType = {
  image: File | null;
  setImage: (image: File | null) => void;
  onSubmit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  companyNameError: string;
  companyImageError: string;
};

const CompanyAdminUi:React.FC<CompanyAdminUiType> = ({
  image,
  setImage,
  onSubmit,
  onInputChange,
  companyNameError,
  companyImageError,
}) => {
  const {classes} = useStyles();

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
            title="Let’s finish setting up your account"
            subtitle={
              <p className={classes.subtitle}>
                Please enter the name and the logo of your company. You can edit this later in your account settings.
              </p>
            }
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.mainForm}>
        <div className={classes.main}>
          <p className={classes.label}>company Logo</p>
          <Dropzone
            image={image}
            setImage={setImage}
            error={!!companyImageError}
            errorText={companyImageError}
          />
        </div>
          <div className={classes.authFormSpacing}>
            <div className={classes.inputSpacing}>
              <Input
                onChange={onInputChange}
                label="Company Name"
                type="text"
                name="companyName"
                error={!!companyNameError}
                errorText={companyNameError}
              />
            </div>
            <div className={classes.buttonContainer}>
              <Button
                title="Create account"
                onClick={onSubmit}
                disabled={!!companyNameError || !!companyImageError}
                w100
              />
            </div>
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default CompanyAdminUi;
