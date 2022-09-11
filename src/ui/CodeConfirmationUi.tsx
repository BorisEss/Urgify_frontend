import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import AuthPageTitle from './AuthPageTitle';
import AuthPageWrapper from './AuthPageWrapper';
import Button from './Buttons/Button';
import CodeInput from './Inputs/CodeInput';
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
  label: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,
  },
  buttonContainer: {
    width: 292,
    paddingTop: 32,

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

type CodeConfirmationUiType = {
  onAuthCodeChange: (value: string) => void;
  onSubmit: () => void;
  error: boolean;
};

const CodeConfirmationUi: React.FC<CodeConfirmationUiType> = ({
  onSubmit,
  onAuthCodeChange,
  error,
}) => {
  const {classes} = useStyles();

  return (
    <AuthPageWrapper
      rightText="A confirmation code was sent to indicated mail. Check your inbox."
      centeredContent
    >
      <div className={classes.contentSpacing}>
        <Logo />
        <div className={classes.titleSpacing}>
          <AuthPageTitle
            title="Activate your account"
            subtitle= {<p className={classes.subtitle}>
            You must activate your account in order to send or receive medical bills, ask for help or make payments and receive payouts</p>}
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.authFormSpacing}>
          <CodeInput onAuthCodeChange={onAuthCodeChange} />
        </div>
          <div className={classes.buttonContainer}>
            <Button
              title="Submit"
              onClick={onSubmit}
              disabled={error}
              w100
            />
          </div>
      </div>
    </AuthPageWrapper>
  );
};

export default CodeConfirmationUi;
