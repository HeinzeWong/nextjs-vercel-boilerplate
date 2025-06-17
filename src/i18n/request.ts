import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  // 获取当前请求的locale
  const locale = await requestLocale || 'en'

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  }
}) 