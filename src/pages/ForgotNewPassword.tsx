import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { forgotSendPasswords } from '../actions/auth';
import NewPasswordsWrapper from '../components/NewPasswordsWrapper';
// import { SignInRoute } from '../navigation/navTypes';
import { getAuthorizeIsFetching } from '../selectors/network';
// import Log from '../services/logger';
import type { AppState } from '../store';

const ForgotNewPassword: React.FC<ReduxProps> = ({
  // forgotPasswordSendPassword,
}) => {
  // const navigate = useNavigate();
  let { uid, token } = useParams();

  const onSubmit = (_password:string, _repeatPassword:string): Promise<any> => {
    // if (uid && token) {
    //   return forgotPasswordSendPassword(password, repeatPassword, uid, token)
    //     .then(() => {
    //       navigate(SignInRoute());
    //       return;
    //     })
    //     .catch((e: any) => {
    //       Log.message(e);
    //       // here can be shown global error, about uid/token
    //       throw e;
    //     });
    // }
    return Promise.resolve();
  };

  if (uid && token) return <NewPasswordsWrapper
    fetchPasswrodsUpdate={onSubmit}
  />;

  return null;
};

const getData = createSelector(
  [getAuthorizeIsFetching],
  (isFetching) => {
    return {
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  forgotPasswordSendPassword: forgotSendPasswords,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ForgotNewPassword);
