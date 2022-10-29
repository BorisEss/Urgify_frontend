import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { createSelector } from 'redux-views';

import { authActions } from '../actions/auth';
import { getRedirectAuthParams, isAuthenticated } from '../selectors/auth';
import type { AppState } from '../store';
import AppRoutes from './AppRoutes';

class AppRouter extends React.Component<ReduxProps> {
  render() {
    const { isAuth, redirectAuthParams, setRedirectParams } = this.props;
    return (
      <Router>
        <React.Suspense>
          <AppRoutes
            isAuth={isAuth}
            redirectAuthParams={redirectAuthParams}
            setRedirectParams={setRedirectParams}
          />
        </React.Suspense>
      </Router>
    );
  }
}

const getData = createSelector(
  [isAuthenticated, getRedirectAuthParams],
  (isAuth, redirectAuthParams) => {
    return {
      isAuth,
      redirectAuthParams,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  setRedirectParams: authActions.setRedirectParams,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AppRouter);
