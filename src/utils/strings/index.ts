export function strcmp(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function strerr(e: any): string {
  if (!e) return '';
  return e.message || '' + e;
}

export function emailIsValid(email: string): boolean {
  const conditions = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/;
  return conditions.test(String(email).toLowerCase());
}
export function minLength(value: string, min: number): boolean {
  if (!value) return false;
  return value.length < min;
}
export function maxLength(value: string, max: number): boolean {
  if (!value) return false;
  return value.length > max;
}
export function isSpace(value: string): boolean {
  return !!value.match(/\s/);
}
export function editNumberString(number: string): string {
  return number.replace(/[+()_\s+]/g, '');
}

export function lowercaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
