import type { CancelTokenSource } from 'axios';

export type ApiResponse = {
  data: unknown;
  errors?: Record<string, string>[];
  errorCode?: string;
  status: number
};

export type Request = {
  method: 'post' | 'get' | 'delete';
  path: string;
  /** body parameters */
  params?: any;
  /** multipart form data */
  formData?: FormDataEntry[];
  isAuth?: boolean;
  isService?: boolean;
  query?: any;
  noReauth?: boolean;
  postponedDate?: number;
  key?: string;
  abortControl?: AbortControl;
};

export type RequestMeta = {
  start: number;
  httpStatus?: number;
  reqSize?: number;
  duration?: number;
  error?: Error;
  respData?: any;
  respSize?: number | string;
};

export type AbortControl = CancelTokenSource;

type FormDataEntry = {
  name: string;
  value: string | File;
};

// auth
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthByMailRequest = {
  email: string;
  password: string;
};

export type RegByMailRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type ConfirmEmailCodeRequest = {
  key: string;
};

export type ForgotSendPasswordsRequest = {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
};

export type AcceptInviteNewUserRequest = {
  password: string;
  hash: string;
};

// payment
export type PaymentIntentRequest = {
  amount: number;
  currency: string;
  payment_method_types: string;
  company_name: string;
  email: string;
  invoices: number;
  months: number;
};

// Companies
export type CompanyType = {
  name: string;
  id: string;
  logo: string;
};

export type AddCompanyRequest = {
  name: string;
  logo: File;
};

// excel - example
export type ExcelTemplateResponse = {
  fileUrl: string;
  lastUpdated: number;
};

export type ExcelProductResponse = {
  id: string;
  article: string;
  name: string;
};
