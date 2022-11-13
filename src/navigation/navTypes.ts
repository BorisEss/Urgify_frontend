/*
 use as navTypes.Home

 all routes should be used through constants

 don't forget to put it in types
 */

export enum navTypes {
  Home = '/',
  SignUp = '/sign-up',
  SignIn = '/sign-in',
  SignInWithParams = '/sign-in/:companyId',
  ForgotPassword = '/forgot-password',
  ForgotNewPassword = '/password-reset/:uid/:token',
  AcceptInviteNewUser = '/accept-invite-new-user/:hash/:companyId',
  AcceptInviteExistingUser = '/accept-invite-existing-user/:hash/:companyId',
  CompanyAdmin = '/companies/add',
  AddPatients = '/companies/:companyId/patients/import',
  AddPatientsList = '/companies/:companyId/patients',
  InvoicesList = '/companies/:companyId/invoices-list',
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
export const CompanyAdminRoute = () => {
  return navTypes.CompanyAdmin;
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
