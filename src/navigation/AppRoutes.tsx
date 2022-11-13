import React from 'react';
import {generatePath, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';

import AcceptInviteExistingUser from '../pages/AcceptInviteExistingUser';
import type { RedirectParamsType } from '../types';
import {navTypes} from './navTypes';

// import screens
const Home = React.lazy(() => import('../pages/Home'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const SignIn = React.lazy(() => import('../pages/SignIn'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
const ForgotNewPassword = React.lazy(() => import('../pages/ForgotNewPassword'));
const AcceptInviteNewUser = React.lazy(() => import('../pages/AcceptInviteNewUser'));
const AddPatientsList = React.lazy(() => import('../pages/AddPatientsList'));
const CompanyAdmin = React.lazy(() => import('../pages/CompanyAdmin'));
const AddPatients = React.lazy(() => import('../pages/AddPatients'));
const InvoicesList = React.lazy(() => import('../pages/InvoicesList'));
const CodeConfirmation = React.lazy(() => import('../pages/CodeConfirmation'));
const SettingsPage = React.lazy(() => import('../pages/SettingsPage'));

type AppRoutesType = {
  isAuth: boolean;
  redirectAuthParams?: RedirectParamsType;
  setRedirectParams: (redirectParams?: RedirectParamsType) => void;
};

const AppRoutes: React.FC<AppRoutesType> = ({
  isAuth,
  redirectAuthParams,
  setRedirectParams,
}) => {
  let location = useLocation();
  const navigate = useNavigate();
  if (isAuth && redirectAuthParams) {
    navigate(
      generatePath(
        redirectAuthParams.to,
        redirectAuthParams.options
      ),
      {
        state: {
          from: redirectAuthParams.from,
        },
      }
    );
    setRedirectParams(undefined);
    return <></>; // Need to prevent executing first router from authorized
  }

  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route path={`${navTypes.Home}`} element={<Home />} />
          <Route path={`${navTypes.SignIn}`} element={<SignIn />}>
            <Route path={':companyId'} element={<SignIn />} />
          </Route>
          <Route path={`${navTypes.SignUp}`} element={<SignUp />} />
          <Route path={`${navTypes.ForgotPassword}`} element={<ForgotPassword />} />
          <Route path={`${navTypes.ForgotNewPassword}`} element={<ForgotNewPassword />} />
          <Route path={`${navTypes.AcceptInviteNewUser}`} element={<AcceptInviteNewUser />} />
          <Route path={`${navTypes.CodeConfirmation}`} element={<CodeConfirmation />} />
          <Route path={`${navTypes.AcceptInviteExistingUser}`} element={<AcceptInviteExistingUser />} />
        </>
      ) : (
        <>
          <Route path={`${navTypes.CompanyAdmin}`} element={<CompanyAdmin />} />
          <Route path={`${navTypes.AddPatients}`} element={<AddPatients />} />
          <Route path={`${navTypes.AddPatientsList}`} element={<AddPatientsList />} />
          <Route path={`${navTypes.InvoicesList}`} element={<InvoicesList />} />
          <Route path={`${navTypes.SettingsPage}`} element={<SettingsPage />} />
          <Route path={`${navTypes.AcceptInviteExistingUser}`} element={<AcceptInviteExistingUser />} />
        </>
      )}
      {/* Redirect with React router 6 */}
      {!(location.pathname.includes('docs') || location.pathname.includes('swagger')) && (
        <Route path="*" element={<Navigate to={!isAuth ? navTypes.Home : navTypes.CompanyAdmin} />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
