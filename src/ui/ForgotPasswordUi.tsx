import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import {navTypes} from '../navigation/navTypes';
import type { ForgotPasswordUiErrors } from '../types';
import AuthPageTitle from './AuthPageTitle';
import AuthPageWrapper from './AuthPageWrapper';
import Button from './Buttons/Button';
import TextButton from './Buttons/TextButton';
import Input from './Inputs/Input';
import Logo from './Logo';

const useStyles = makeStyles()((theme: Theme) => ({
  logoBox: {
    position: 'absolute',
    top: 0,
    left: 0,

    [theme.breakpoints.down('sm')]: {
      position: 'unset',
    },
  },
  titleSpacing: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 41,
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
    paddingBottom: 11,

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('lg')]: {
      gap: 24,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'unset',
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
}));

type ForgotPasswordType = {
  errors: ForgotPasswordUiErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: (field: string) => void;
  onSubmit: () => void;
};

const ForgotPasswordUi : React.FC<ForgotPasswordType> = ({
  errors,
  onInputChange,
  validateField,
  onSubmit,
}) => {
  const {classes} = useStyles();

  return (
    <AuthPageWrapper
      rightText="We make collecting bills easier for businesses & less stressful for customers."
      centeredContent>
      <div>
        <div className={classes.logoBox}>
          <Logo />
        </div>
        <div className={classes.titleSpacing}>
          <AuthPageTitle
            title="Forgot your password?"
            subtitle={
              <p className={classes.subtitle}>
                Enter your email address to reset your password. You may need to check your spam folder.
              </p>
            }
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.authFormSpacing}>
          <div className={classes.inputSpacing}>
            <Input
              label="E-mail address"
              type="email"
              onChange={onInputChange}
              name="email"
              error={!!errors.email}
              errorText={errors.email}
              onBlur={() => validateField('email')}
              />
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.buttonContainer}>
            <Button
              title="Submit"
              onClick={onSubmit}
              disabled={!!errors.email}
              w100
            />
          </div>
          <TextButton type="link" path={navTypes.SignIn} color="gray" title="I remember now" />
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default ForgotPasswordUi;
