/*
 use as navTypes.Home

 all routes should be used through constants

 don't forget to put it in types
 */

export enum navTypes {
  Home = '/',
  SignUp = '/sign-up',
  SignIn = '/sign-in',
  SignInWithParams = '/sign-in/:hospitalId/:departmentId',
  ForgotPassword = '/forgot-password',
  ForgotNewPassword = '/password-reset/:uid/:token',
  AcceptInviteNewUser = '/accept-invite-new-user/:hash/:hospitalId/:departmentId',
  AcceptInviteExistingUser = '/accept-invite-existing-user/:hash/:hospitalId/:departmentId',
  HospitalAdmin = '/hospitals/add',
  AddPatients = '/hospitals/:hospitalId/departments/:departmentId/patients/import',
  AddPatientsList = '/hospitals/:hospitalId/departments/:departmentId/patients',
  InvoicesList = '/hospitals/:hospitalId/departments/:departmentId/invoices-list',
  CodeConfirmation = '/code-confirmation',
  SettingsPage = '/settings-page',
}

export const HomeRoute = () => {
  return navTypes.Home;
};
export const SignUpRoute = () => {
  return navTypes.SignUp;
};
export const SignInRoute = () => {
  return navTypes.SignIn;
};
export const SignInWithParamsRoute = () => {
  return navTypes.SignInWithParams;
};
export const ForgotPasswordRoute = () => {
  return navTypes.ForgotPassword;
};
export const ForgotNewPasswordRoute = () => {
  return navTypes.ForgotNewPassword;
};
export const AcceptInviteNewUserRoute = () => {
  return navTypes.AcceptInviteNewUser;
};
export const HospitalAdminRoute = () => {
  return navTypes.HospitalAdmin;
};
export const  AddPatientsRoute = () => {
  return navTypes.AddPatients;
};
export const  AddPatientsListRoute = () => {
  return navTypes.AddPatientsList;
};
export const  InvoicesListRoute = () => {
  return navTypes.InvoicesList;
};
export const CodeConfirmationRoute = () => {
  return navTypes.CodeConfirmation;
};
export const SettingsPageRoute = () => {
  return navTypes.SettingsPage;
};
