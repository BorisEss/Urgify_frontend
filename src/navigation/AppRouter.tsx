import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { createSelector } from 'redux-views';

import { isAuthenticated } from '../selectors/auth';
import type { AppState } from '../store';
import AppRoutes from './AppRoutesType';

class AppRouter extends React.Component<ReduxProps> {
  render() {
    const { isAuth } = this.props;
    return (
      <Router>
        <React.Suspense>
          <AppRoutes
            isAuth={isAuth}
          />
        </React.Suspense>
      </Router>
    );
  }
}

const getData = createSelector(
  [isAuthenticated],
  (isAuth) => {
    return {
      isAuth,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AppRouter);
