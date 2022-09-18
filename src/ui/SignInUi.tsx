import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import GoogleAuthWrapper from '../components/GoogleAuthWrapper';
import {navTypes} from '../navigation/navTypes';
import type { SignInUiErrors } from '../types';
import AuthPageTitle from './AuthPageTitle';
import AuthPageWrapper from './AuthPageWrapper';
import Button from './Buttons/Button';
import TextButton from './Buttons/TextButton';
import ChangeAuthMethod from './ChangeAuthMethod';
import Input from './Inputs/Input';
import Logo from './Logo';

const useStyles = makeStyles()((theme: Theme) => ({
  contentSpacing: {
    paddingBottom: 90,

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  titleSpacing: {
    paddingTop: 56,
    paddingBottom: 32,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 41,
      paddingBottom: 24,
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
  googleWrapper: {
    width: 292,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

type SignInUiType = {
  errors: SignInUiErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: (field: string) => void;
  onSubmit: () => void;
};

const SignInUi: React.FC<SignInUiType> = ({
  onInputChange,
  validateField,
  onSubmit,
  errors,
}) => {
  const {classes} = useStyles();

  return (
    <AuthPageWrapper rightText="Nisi sed sit sed facilisis luctus odio eu mauris. Varius sed at nibh non ut tristique. Sit vel dictumst nisi.">
      <div className={classes.contentSpacing}>
        <Logo />
        <div className={classes.titleSpacing}>
          <AuthPageTitle title="Sign in to Urgify" />
        </div>
        <div className={classes.googleWrapper}>
          <GoogleAuthWrapper
            title="Sign in with Google"
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
              onBlur={() => validateField('email')}
            />
          </div>
          <div className={classes.inputSpacing}>
            <Input
              label="Password"
              type="password"
              onChange={onInputChange}
              name="password"
              error={!!errors.password}
              onBlur={() => validateField('password')}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.buttonContainer}>
            <Button
              title="Sign In"
              onClick={onSubmit}
              disabled={!!errors.email || !!errors.password}
              w100
            />
          </div>
          <TextButton
            type="link" path={navTypes.ForgotPassword}
            color="gray"
            title="Forgot your password?"
          />
        </div>
        <div className={classes.changeAuthSpacing}>
          <ChangeAuthMethod
            type="link"
            path={navTypes.SignUp}
            title="Don't have an account?"
            buttonTitle="Sign up for free"
          />
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default SignInUi;
