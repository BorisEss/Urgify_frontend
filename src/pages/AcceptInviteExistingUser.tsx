import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { acceptInviteExistingUser } from '../actions/auth';
import { AddPatientsRoute, SignInWithParamsRoute } from '../navigation/navTypes';
import { isAuthenticated } from '../selectors/auth';
import { getAuthorizeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';

const AcceptInviteExistingUser: React.FC<ReduxProps> = ({
  isAuth,
  isFetching,
  acceptInviteExisting,
}) => {
  const navigate = useNavigate();
  let { hash, companyId, departmentId } = useParams();

  const sendAcceptRequest = () => {
    if (hash) {
      acceptInviteExisting(hash)
        .then(() => {
          if (isAuth) {
            navigate(generatePath(AddPatientsRoute(), { companyId, departmentId }));
          } else {
            navigate(generatePath(SignInWithParamsRoute(), { companyId, departmentId }));
          }
          return;
        })
        .catch((e: any) => {
          Log.message(e);
          // here can be shown global error, about hash
          throw e;
        });
    }
  };

  React.useEffect(() => {
    if (hash && !isFetching) {
      sendAcceptRequest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const getData = createSelector(
  [isAuthenticated, getAuthorizeIsFetching],
  (isAuth, isFetching) => {
    return {
      isAuth,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  acceptInviteExisting: acceptInviteExistingUser,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AcceptInviteExistingUser);
