import { ApiError } from './errors';

export function decodeInteger(data: any) {
  if (!data) return 0;
  const res: number = Number(data);
  if (!Number.isInteger(res)) {
    throw new ApiError(
      'IncorrectResponse',
      `expect integer, but got '${data}'`,
    );
  }
  return res;
}

export function decodeFloatOpt(data: any) {
  if (typeof data !== 'number') return undefined;
  const res: number = Number(data);
  if (Number.isNaN(res) || !Number.isFinite(res)) {
    throw new ApiError('IncorrectResponse', `expect number, but got '${data}'`);
  }
  return res;
}

export function decodeFloat(data: any, defaultValue = 0): number {
  if (typeof data !== 'number') return defaultValue;
  const res: number = Number(data);
  if (Number.isNaN(res) || !Number.isFinite(res)) {
    return defaultValue;
  }
  return res;
}

export function decodeDateOpt(data: any) {
  if (typeof data !== 'string') return undefined;
  const value = Date.parse(data);
  if (Number.isNaN(value)) return undefined;
  return value;
}

export function decodeString(data: any): string {
  if (!data) return '';
  if (typeof data === 'string' || typeof data === 'number') {
    return String(data);
  } else {
    return '';
  }
}

export function decodeStringOpt(data: any): string | undefined {
  if (typeof data !== 'string' && typeof data !== 'number') return undefined;
  return String(data);
}

export function decodeAlias(data: any) {
  return decodeString(data).toLowerCase();
}

export function decodeBool(data: any): boolean {
  return !!data;
}

export function decodeList<T>(data: any, rowDecoder: (input: any) => T): T[] {
  if (!Array.isArray(data)) return [];
  const ret: T[] = [];
  for (const row of data) {
    ret.push(rowDecoder(row));
  }
  return ret;
}

export function decodeVoid(_data: any) {
  return undefined;
}
