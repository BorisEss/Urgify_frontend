import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { acceptInviteNewUser } from '../actions/auth';
import NewPasswordsWrapper from '../components/NewPasswordsWrapper';
import { SignInWithParamsRoute } from '../navigation/navTypes';
import { getAuthorizeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';

const AcceptInviteNewUser: React.FC<ReduxProps> = ({
  acceptInviteSendPassword,
}) => {
  const navigate = useNavigate();
  let { hash, hospitalId, departmentId } = useParams();

  const onSubmit = (password:string, _repeatPassword:string): Promise<any> => {
    if (hash) {
      return acceptInviteSendPassword(password, hash)
        .then(() => {
          navigate(generatePath(SignInWithParamsRoute(), { hospitalId, departmentId }));
          return;
        })
        .catch((e: any) => {
          Log.message(e);
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
  acceptInviteSendPassword: acceptInviteNewUser,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AcceptInviteNewUser);
