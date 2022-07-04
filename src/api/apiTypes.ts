import type { CancelTokenSource } from 'axios';

export type ApiResponse = {
  data: unknown;
  isSuccess: boolean;
  errors?: Record<string, string>[];
  errorCode?: string;
};

export type Request = {
  method: 'post' | 'get';
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

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthByMailRequest = {
  email: string;
  password: string;
};

export type RegByMailRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ExcelTemplateResponse = {
  fileUrl: string;
  lastUpdated: number;
};

export type ExcelProductResponse = {
  id: string;
  article: string;
  name: string;
};
