import axios from 'axios';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { authByGoogle } from '../actions/auth';
import Log from '../services/logger';
import GoogleButton from '../ui/Buttons/GoogleButton';

type GoogleAuthWrapperType = {
  title: string;
}

type Props = GoogleAuthWrapperType & ReduxProps;

const GoogleAuthWrapper: React.FC<Props> = ({
  // googleAuth,
  title,
}) => {
  const makeGoogleAuthRequest = () => {
    axios
      .request({
        url: 'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://urgify.io/api/auth/google/login/callback/&prompt=consent&response_type=code&client_id=94023399944-bvmck2cigngkukamfpl5il469e9aaogv.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline',
      })
      .then((response) => {
        Log.message(response);
        // response.tokenId
        // if(response && response.tokenId) {
        //   googleAuth(response.tokenId)
        // }
        // request('/api/auth/google-login/web/', 'POST', {}, {
        //   'Authorization': `Bearer ${response.tokenId}`
      })
      .catch((error) => {
        Log.message(error);
      });
  };
  return (
    <GoogleButton
      title={title}
      onClick={makeGoogleAuthRequest}
    />
  );
};

const connector = connect(null, {
  googleAuth: authByGoogle,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(GoogleAuthWrapper);
