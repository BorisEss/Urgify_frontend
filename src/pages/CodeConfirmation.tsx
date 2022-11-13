import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { confirmEmailCode } from '../actions/auth';
// import { SignInRoute } from '../navigation/navTypes';
import { getAuthErrors } from '../selectors/auth';
import { getAuthorizeIsFetching } from '../selectors/network';
// import Log from '../services/logger';
import type { AppState } from '../store';
import CodeConfirmationUi from '../ui/CodeConfirmationUi';

const CodeConfirmation: React.FC<ReduxProps> = ({
  // confirmEmail,
  // authErrors,
  // isFetching,
}) => {
  // const [authCode, setAuthCode] = useState<string>('');
  const [_authCode, setAuthCode] = useState<string>('');
  const [error, setError] = useState<boolean>(true);
  // const navigate = useNavigate();

  const onSubmit = () => {
    // confirmEmail(authCode)
    //   .then(() => {
    //     navigate(SignInRoute());
    //   })
    //   .catch((e: any) => {
    //     // TODO: after this show some error or fake error from server. Need to confirm by design
    //     Log.message(e);
    //   });
    setError(false);
  };

  const onEnterCode = (value: string) => {
    if (value.length < 6) {
      setError(true);
    } else {
      setError(false);
    }
    setAuthCode(value);
  };

  return <CodeConfirmationUi
    onAuthCodeChange={onEnterCode}
    onSubmit={onSubmit}
    error={error}
  />;
};

const getData = createSelector(
  [getAuthErrors, getAuthorizeIsFetching],
  (authErrors, isFetching) => {
    return {
      authErrors,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  confirmEmail: confirmEmailCode,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CodeConfirmation);
