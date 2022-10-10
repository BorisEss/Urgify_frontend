/*
 use as navTypes.Home

 all routes should be used through constants

 don't forget to put it in types
 */

export enum navTypes {
  Home = '/',
  SignUp = '/sign-up',
  SignIn = '/sign-in',
  ForgotPassword = '/forgot-password',
  ForgotNewPassword = '/password-reset/:uid/:token',
  HospitalAdmin = '/hospitals/add',
  HospitalAddDepartments = '/hospitals/:hospitalId/departments/add',
  Hospitals = '/hospitals/',
  AddDepartmentEmployee = '/hospitals/:hospitalId/departments/:departmentId/employees/add',
  EmployeeList = '/hospitals/:hospitalId/departments/:departmentId/employees',
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
export const ForgotPasswordRoute = () => {
  return navTypes.ForgotPassword;
};
export const ForgotNewPasswordRoute = () => {
  return navTypes.ForgotNewPassword;
};
export const HospitalAdminRoute = () => {
  return navTypes.HospitalAdmin;
};
export const HospitalAddDepartmentsRoute = () => {
  return navTypes.HospitalAddDepartments;
};
export const HospitalsRoute = () => {
  return navTypes.Hospitals;
};
export const  AddDepartmentEmployeeRoute = () => {
  return navTypes.AddDepartmentEmployee;
};
export const  EmployeeListRoute = () => {
  return navTypes.EmployeeList;
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
