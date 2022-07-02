import axios, { AxiosError, Cancel } from 'axios';

import { strerr } from '../utils/strings';
import type { Request } from './apiTypes';

export class ApiError extends Error {
  code: string;
  isTemporary: boolean = false;
  originalError?: Error;
  request?: Request;
  duration?: number;

  constructor(code?: string, message?: string) {
    super(message || '');
    this.code = code || '';
  }

  toJSON(): any {
    const o: any = {
      type: 'ApiError',
      code: this.code,
      message: this.message,
      temp: this.isTemporary,
    };
    if (this.originalError) o.originalError = strerr(this.originalError);
    if (this.request) o.request = this.request;
    if (this.duration) o.duration = this.duration;
    return o;
  }
}

export function isAxiosError(e: any): e is AxiosError {
  return typeof e === 'object' && e.isAxiosError === true;
}

export function isAxiosCancel(e: any): e is Cancel {
  return axios.isCancel(e);
}

export function isApiError(e: any): e is ApiError {
  return e instanceof ApiError;
}
