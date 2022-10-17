import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { acceptInvite } from '../actions/auth';
import NewPasswordsWrapper from '../components/NewPasswordsWrapper';
import { SignInRoute } from '../navigation/navTypes';
import { getAuthorizeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';

const AcceptInvite: React.FC<ReduxProps> = ({
  acceptInviteSendPassword,
}) => {
  const navigate = useNavigate();
  let { hash } = useParams();

  const onSubmit = (password:string, repeatPassword:string): Promise<any> => {
    if (hash) {
      return acceptInviteSendPassword(password, repeatPassword, hash)
        .then(() => {
          navigate(SignInRoute());
          return;
        })
        .catch((e: any) => {
          Log.message(e);
          // here can be shown global error, about hash
          throw e;
        });
    }
    return Promise.resolve();
  };

  if (hash) return <NewPasswordsWrapper
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
  acceptInviteSendPassword: acceptInvite,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AcceptInvite);
