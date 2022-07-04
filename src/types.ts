// import type {Price} from './api/apiTypes';

// export type SelectOption<T> = {
//   value: T;
//   viewValue: string;
// };

export type SignInUiFields = {
  email: string;
  password: string;
};
export type SignUpUiFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type ForgotPasswordUiFields = {
  email: string;
};

export type ForgotPasswordUiErrors = Record<string, string>;

export type SignInUiErrors = Record<string, string>;

export type SignUpUiErrors = Record<string, string>;
