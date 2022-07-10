import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { createSelector } from 'redux-views';

import { isAuthenticated } from '../selectors/auth';
import type { AppState } from '../store';
import {navTypes} from './navTypes';

// import screens
const Home = React.lazy(() => import('../pages/Home'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const SignIn = React.lazy(() => import('../pages/SignIn'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
const HospitalAdmin = React.lazy(() => import('../pages/HospitalAdmin'));
const HospitalAddDepartments = React.lazy(() => import('../pages/HospitalAddDepartments'));
const HospitalDepartments = React.lazy(() => import('../pages/HospitalDepartments'));

class AppRouter extends React.Component<ReduxProps> {
  render() {
    const { isAuth } = this.props;
    return (
      <Router>
        <React.Suspense>
          <Routes>
            {/* To logout - clear localStorage */}
            {!isAuth ? (
              <>
                <Route path={`${navTypes.Home}`} element={<Home />} />
                <Route path={`${navTypes.SignIn}`} element={<SignIn />} />
                <Route path={`${navTypes.SignUp}`} element={<SignUp />} />
                <Route path={`${navTypes.ForgotPassword}`} element={<ForgotPassword />} />
              </>
            ) : (
              <>
                <Route path={`${navTypes.HospitalAdmin}`} element={<HospitalAdmin />} />
                <Route path={`${navTypes.HospitalAddDepartments}`} element={<HospitalAddDepartments />} />
                <Route path={`${navTypes.HospitalDepartments}`} element={<HospitalDepartments />} />
              </>
            )}

            {/* Redirect with React router 6 */}

            {/* TODO: Specify what flow will be after authorization */}
            {/* first page will be AddHospitalAdmin, but then first will be another(maybe dashboard or smth) */}
            {/* After sign up - AddHospitalAdmin!, but after sign in - another(!!!or add hospital if not added before) */}
            <Route path="*" element={<Navigate to={!isAuth ? navTypes.Home : navTypes.HospitalAdmin} />} />
          </Routes>
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
