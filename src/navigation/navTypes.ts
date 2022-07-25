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
  HospitalAdmin = '/hospitals/add',
  HospitalAddDepartments = '/hospitals/:hospitalId/departments/add',
  HospitalDepartments = '/hospitals/:hospitalId/departments',
  EmployeeDepartment = '/hospitals/:hospitalId/departments/:departmentId/employees/add',
  EmployeeList = '/hospitals/:hospitalId/departments/:departmentId/employees',
  AddPatients = '/hospitals/:hospitalId/departments/:departmentId/patients',
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
export const HospitalAdminRoute = () => {
  return navTypes.HospitalAdmin;
};
export const HospitalAddDepartmentsRoute = () => {
  return navTypes.HospitalAddDepartments;
};
export const HospitalDepartmentsRoute = () => {
  return navTypes.HospitalDepartments;
};
export const  EmployeeDepartmentRoute = () => {
  return navTypes.EmployeeDepartment;
};
export const  EmployeeListRoute = () => {
  return navTypes.EmployeeList;
};
export const  AddPatientsRoute = () => {
  return navTypes.AddPatients;
};
