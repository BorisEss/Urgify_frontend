import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import {navTypes} from '../navigation/navTypes';
import type { PasswordSecureFields, SignUpUiErrors } from '../types';
import AuthPageTitle from './AuthPageTitle';
import AuthPageWrapper from './AuthPageWrapper';
import Button from './Buttons/Button';
import GoogleButton from './Buttons/GoogleButton';
import TextButton from './Buttons/TextButton';
import ChangeAuthMethod from './ChangeAuthMethod';
import Input from './Inputs/Input';
import Logo from './Logo';
import MustContain from './MustContain';

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
  googleWrapper: {
    width: 292,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mustContain: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  mustContainTitle: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    color: '#666666',
    lineHeight: '24px',
    paddingBottom: 16,
  },
  mustContainItems: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

type SignUpUiType = {
  errors: SignUpUiErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: (field: string) => void;
  onSubmit: () => void;
  passwordSecure: PasswordSecureFields;
};

const SignUpUi: React.FC<SignUpUiType> = ({
  onInputChange,
  validateField,
  onSubmit,
  errors,
  passwordSecure,
}) => {
  const {classes, cx} = useStyles();

  return (
    <AuthPageWrapper rightText="We make collecting medical bills easier for companies & less stressful for customers.">
      <div className={classes.contentSpacing}>
        <Logo />
        <div className={classes.titleSpacing}>
          <AuthPageTitle
            title="Create an account"
            subtitle={
              <p className={classes.subtitle}>
                By signing up, I agree to Urgify's&nbsp;
                <TextButton color="gray" title="Terms" onClick={() => {}} /> and&nbsp;
                <TextButton color="gray" title="Privacy Policy" onClick={() => {}} />.
              </p>
            }
          />
        </div>
        <div className={classes.googleWrapper}>
          <GoogleButton
            title="Sign up with Google"
            clientId={process.env.REACT_APP_GOOGLE_SIGNOUT_CLIENT_ID}
            // onSuccess
            // onFailure
            // setDisabled
            // disabled
            // loading
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.authFormSpacing}>
          <div className={cx(classes.inputFlexBox, classes.inputSpacing)}>
            <div className={classes.halfInput}>
              <Input
                label="First Name"
                type="string"
                error={!!errors.firstName}
                errorText={errors.firstName}
                onBlur={() => validateField('firstName')}
                name="firstName"
                onChange={onInputChange}
                />
            </div>
            <div className={classes.halfInput}>
              <Input
                label="Last Name"
                type="string"
                error={!!errors.lastName}
                errorText={errors.lastName}
                onBlur={() => validateField('lastName')}
                name="lastName"
                onChange={onInputChange}
                />
            </div>
          </div>
          <div className={classes.inputSpacing}>
            <Input
              onChange={onInputChange}
              label="E-mail address"
              type="email"
              error={!!errors.email}
              errorText={errors.email}
              onBlur={() => validateField('email')}
              name="email"
              />
          </div>
            <Input
              onChange={onInputChange}
              label="Password"
              type="password"
              error={!!errors.password}
              errorText={errors.password}
              onBlur={() => validateField('password')}
              name="password"
              />
              <div className={classes.mustContain}>
                <p className={classes.mustContainTitle}>To keep your account secure, your password must contain:</p>
                <div className={classes.mustContainItems}>
                  <MustContain
                    title="8+"
                    description="characters minimum"
                    checked={passwordSecure.minLength}
                  />
                  <MustContain
                    title="az"
                    description="lowercase letter"
                    checked={passwordSecure.hasLowerCaseLetter}
                  />
                  <MustContain
                    title="AZ"
                    description="uppercase letter"
                    checked={passwordSecure.hasUpperCaseLetter}
                  />
                  <MustContain
                    title="#"
                    description="special character"
                    checked={passwordSecure.hasSpecialCharacter}
                  />
                  <MustContain
                    title="123"
                    description="number"
                    checked={passwordSecure.hasNumber}
                  />
                </div>
              </div>
        </div>
        <Button
          title="Sign Up"
          onClick={onSubmit}
          disabled={!!errors.email || !!errors.password || !!errors.firstName || !!errors.lastName}
          w100
        />
        <div className={classes.changeAuthSpacing}>
          <ChangeAuthMethod type="link" path={navTypes.SignIn} title="Already have an account?" buttonTitle="Sign In" />
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default SignUpUi;
