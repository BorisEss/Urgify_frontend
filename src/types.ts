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
  companyName: string;
};
export type NewCustomerFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  socialSecurityNumber: string;
  phone: string;
  address: string;
};
export type NewInvoiceFormFields = {
  customerName: string;
  dateServiceStart: string;
  dateServiceEnd: string;
  serviceDescription: string;
  chargesAmount: string;
  dueDate: string;
};

export type SignUpUiFields = {
  email: string;
  password: string;
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
export type NewPasswordsFields = {
  password: string;
  repeatPassword: string;
};

export type ForgotPasswordUiErrors = Record<string, string>;

export type NewPasswordsErrors = Record<string, string>;

export type SignInUiErrors = Record<string, string>;

export type JoinWaitingListFormErrors = Record<string, string>;

export type PreOrderFormErrors = Record<string, string>;

export type NewCustomerFormErrors = Record<string, string>;

export type NewInvoiceFormErrors = Record<string, string>;

export type SignUpUiErrors = Record<string, string>;

export type PaymentOption = {
  id: number;
  title: string;
  title2?: string;
  checked: boolean;
}

export type DrawerLinkType = {
  title: string;
  icon: string;
  to: string;
  pathParams: Record<string, string>;
  isActive?: boolean;
}

export type RedirectParamsType = {
  to: string;
  from?: string;
  options?: Record<string, string>;
}

