import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'


interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{
    region: string
    locale: string
  }>
}

export async function generateStaticParams() {
  const regions = ['cn', 'jp', 'us']
  const locales = ['zh', 'ja', 'en']
  
  const params = []
  for (const region of regions) {
    for (const locale of locales) {
      params.push({ region, locale })
    }
  }
  
  return params
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  
  // 设置当前这次请求的多语言
  setRequestLocale(locale)
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 