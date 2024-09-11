import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locales } from './locales';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locales)) notFound();
  
  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
