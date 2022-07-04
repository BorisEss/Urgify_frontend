import type {Locale} from 'date-fns';
import dateFmt from 'date-fns/format';
import {enGB} from 'date-fns/locale';

export function formatApiDate(date: number | undefined, format: string = 'dd MMMM'): string {
  if (!date) return '';
  const locales: Record<string, Locale> = {en: enGB};
  return dateFmt(date, format, {locale: locales.en});
}
