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

export function hasLowerCaseLetter(value: string): boolean {
  if (!value) return false;
  return (/[a-z]/.test(value));
}

export function hasUpperCaseLetter(value: string): boolean {
  if (!value) return false;
  return (/[A-Z]/.test(value));
}

export function hasSpecialCharacter(value: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (!value) return false;
  return format.test(value);
}

export function hasNumber(value: string): boolean {
  if (!value) return false;
  return /\d/.test(value);
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

export function checkTwoStringsWithNoCase(str1:string, str2: string) {
  return str1.toLowerCase() === str2.toLowerCase();
}
