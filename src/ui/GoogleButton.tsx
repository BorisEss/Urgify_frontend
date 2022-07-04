
import type {Theme} from '@mui/material';
import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import {makeStyles} from 'tss-react/mui';

import images from '../images';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    padding: '16px 24px',
    cursor: 'pointer',
    background: '#FFFFFF',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',

    '& div': {
      alignItems: 'center',
      display: 'flex',
      width: '100%',
    },

    '& p': {
      fontSize: 16,
      lineHeight: '24px',
      fontFamily: 'Poppins-semibold',
      color: '#2B364D',
      flex: 1,
      textAlign: 'center',
    },

    '& img': {
      width: 24,
      height: 24,
      objectFit: 'cover',
    },

    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px',

      '& p': {
        fontSize: 12,
        lineHeight: '18px',
      },

      '& img': {
        width: 16,
        height: 16,
      },
    },
  },
  disabled: {
    pointerEvents: 'none',
    cursor: 'not-allowed',

    '& p': {
      color: 'rgba(39, 38, 61, 0.5)',
    },
  },
}));

type GoogleButtonType = {
  title: string;
  clientId?: string;
  onSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure?: (error: any) => void;
  setDisabled?: (disabled: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
};

const GoogleButton: React.FC<GoogleButtonType> = ({
  title,
  clientId,
  onSuccess,
  onFailure,
  setDisabled,
  disabled,
  loading,
}) => {
  const {classes, cx} = useStyles();
  return (
    <GoogleLogin
      clientId={clientId ? clientId : ''}
      onSuccess={(resp) => (onSuccess ? onSuccess(resp) : () => {})}
      onFailure={(e) => (onFailure ? onFailure(e) : () => {})}
      cookiePolicy={'single_host_origin'}
      render={renderProps => (
        <div
          className={cx(classes.button, disabled || renderProps.disabled || loading ? classes.disabled : '')}
          onClick={() => {
            setDisabled && setDisabled(true);
            renderProps.onClick();
          }}>
            <div>
              <img src={images.google} alt="Google icon" />
              <p>{title}</p>
            </div>
        </div>
      )}
    />
  );
};

export default GoogleButton;
