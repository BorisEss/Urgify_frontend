import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import AcceptInvite from '../pages/AcceptInvite';
import AddPatientsList from '../pages/AddPatientsList';
import {navTypes} from './navTypes';

// import screens
const Home = React.lazy(() => import('../pages/Home'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const SignIn = React.lazy(() => import('../pages/SignIn'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
const ForgotNewPassword = React.lazy(() => import('../pages/ForgotNewPassword'));
const HospitalAdmin = React.lazy(() => import('../pages/HospitalAdmin'));
const HospitalAddDepartments = React.lazy(() => import('../pages/HospitalAddDepartments'));
const Hospitals = React.lazy(() => import('../pages/Hospitals'));
const AddDepartmentEmployee = React.lazy(() => import('../pages/AddDepartmentEmployee'));
const EmployeeList = React.lazy(() => import('../pages/EmployeeList'));
const AddPatients = React.lazy(() => import('../pages/AddPatients'));
const InvoicesList = React.lazy(() => import('../pages/InvoicesList'));
const CodeConfirmation = React.lazy(() => import('../pages/CodeConfirmation'));
const SettingsPage = React.lazy(() => import('../pages/SettingsPage'));

type AppRoutesType = {
  isAuth: boolean;
};

const AppRoutes: React.FC<AppRoutesType> = ({
  isAuth,
}) => {
  let location = useLocation();
  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route path={`${navTypes.Home}`} element={<Home />} />
          <Route path={`${navTypes.SignIn}`} element={<SignIn />} />
          <Route path={`${navTypes.SignUp}`} element={<SignUp />} />
          <Route path={`${navTypes.ForgotPassword}`} element={<ForgotPassword />} />
          <Route path={`${navTypes.ForgotNewPassword}`} element={<ForgotNewPassword />} />
          <Route path={`${navTypes.AcceptInvite}`} element={<AcceptInvite />} />
          <Route path={`${navTypes.CodeConfirmation}`} element={<CodeConfirmation />} />
        </>
      ) : (
        <>
          <Route path={`${navTypes.HospitalAdmin}`} element={<HospitalAdmin />} />
          <Route path={`${navTypes.HospitalAddDepartments}`} element={<HospitalAddDepartments />} />
          <Route path={`${navTypes.Hospitals}`} element={<Hospitals />} />
          <Route path={`${navTypes.AddDepartmentEmployee}`} element={<AddDepartmentEmployee />} />
          <Route path={`${navTypes.EmployeeList}`} element={<EmployeeList />} />
          <Route path={`${navTypes.AddPatients}`} element={<AddPatients />} />
          <Route path={`${navTypes.AddPatientsList}`} element={<AddPatientsList />} />
          <Route path={`${navTypes.InvoicesList}`} element={<InvoicesList />} />
          <Route path={`${navTypes.SettingsPage}`} element={<SettingsPage />} />
        </>
      )}
      {/* Redirect with React router 6 */}
      {!(location.pathname.includes('docs') || location.pathname.includes('swagger')) && (
        <Route path="*" element={<Navigate to={!isAuth ? navTypes.Home : navTypes.HospitalAdmin} state={
          isAuth ? {from: navTypes.SignIn} : null
        } />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
