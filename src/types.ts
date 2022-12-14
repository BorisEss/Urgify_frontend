// import type {Price} from './api/apiTypes';

// export type SelectOption<T> = {
//   value: T;
//   viewValue: string;
// };

export type SignInUiFields = {
  email: string;
  password: string;
};
export type JoinWaitingListFormFields = {
  email: string;
};

export type PreOrderFormFields = {
  email: string;
  hospitalName: string;
};
export type NewPatientFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  socialSecurityNumber: string;
  phone: string;
  address: string;
};

export type SignUpUiFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type EmployeeDepartmentUiFields = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};

export type PasswordSecureFields = {
  minLength: boolean;
  hasNumber: boolean;
  hasLowerCaseLetter: boolean;
  hasUpperCaseLetter: boolean;
  hasSpecialCharacter: boolean;
}

export type ForgotPasswordUiFields = {
  email: string;
};
export type ForgotNewPasswordUiFields = {
  password: string;
  repeatPassword: string;
};

export type ForgotPasswordUiErrors = Record<string, string>;

export type ForgotNewPasswordUiErrors = Record<string, string>;

export type SignInUiErrors = Record<string, string>;

export type JoinWaitingListFormErrors = Record<string, string>;

export type PreOrderFormErrors = Record<string, string>;

export type NewPatientFormErrors = Record<string, string>;

export type SignUpUiErrors = Record<string, string>;

export type EmployeeDepartmentUiErrors = Record<string, string>;

export type DepartmentsFieldsType = Record<string, string>;

export type EmployeeAttributeItem = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export type PaymentOption = {
  id: number;
  title: string;
  title2?: string;
  checked: boolean;
}
