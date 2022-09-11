import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { ForgotNewPasswordUiErrors } from '../types';
import type { PasswordSecureFields} from '../types';
import AuthPageTitle from './AuthPageTitle';
import AuthPageWrapper from './AuthPageWrapper';
import Button from './Buttons/Button';
import Input from './Inputs/Input';
import Logo from './Logo';
import MustContain from './MustContain';

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

type ForgotNewPasswordType = {
  errors: ForgotNewPasswordUiErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: (field: string) => void;
  onSubmit: () => void;
  passwordSecure: PasswordSecureFields;
};

const ForgotNewPasswordUi : React.FC<ForgotNewPasswordType> = ({
  errors,
  onInputChange,
  validateField,
  onSubmit,
  passwordSecure,
}) => {
  const {classes} = useStyles();

  return (
    <AuthPageWrapper
      rightText="Sit nisl adipiscing sed porta. Lobortis suscipit nisl, risus sollicitudin. Laoreet dictum suspendisse sem."
      centeredContent>
      <div>
        <div className={classes.logoBox}>
          <Logo />
        </div>
        <div className={classes.titleSpacing}>
          <AuthPageTitle
            title="Enter your new password"
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.authFormSpacing}>
          <div className={classes.inputSpacing}>
            <Input
              label="New Password"
              type="password"
              onChange={onInputChange}
              name="password"
              error={!!errors.password}
              onBlur={() => validateField('password')}
              placeholder="New password"
            />
          </div>
          <Input
            label="Confirm New Password"
            type="password"
            onChange={onInputChange}
            name="repeatPassword"
            error={!!errors.repeatPassword}
            onBlur={() => validateField('password')}
            placeholder="Repeat new password"
          />
        </div>
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
        <div className={classes.actions}>
          <div className={classes.buttonContainer}>
            <Button
              title="Submit"
              onClick={onSubmit}
              disabled={!!errors.email}
              w100
            />
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  );
};

export default ForgotNewPasswordUi;
