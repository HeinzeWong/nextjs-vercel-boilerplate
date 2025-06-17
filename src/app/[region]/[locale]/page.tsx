import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import RegionSelector from '@/src/components/RegionSelector'
import type { Locale, Region } from '@/src/libs'

interface PageProps {
  params: Promise<{
    region: Region
    locale: Locale
  }>
}

export default async function HomePage({ params }: PageProps) {
  const { region, locale } = await params

  // 设置当前这次请求的多语言
  setRequestLocale(locale);

  const t = await getTranslations('HomePage')

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        {/* 地区语言选择器 */}
        <RegionSelector currentRegion={region} currentLocale={locale} />

        <h1 className='text-4xl font-bold text-center sm:text-left'>
          {t('title')}
        </h1>

        <p className='text-lg text-center sm:text-left'>
          {t('description', { region, locale })}
        </p>

        <ol className='list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          <li className='mb-2 tracking-[-.01em]'>{t('step1')}</li>
          <li className='tracking-[-.01em]'>{t('step2')}</li>
        </ol>

        {/* 导航链接 */}
        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <Link
            href='/products'
            className='rounded-full border border-solid bg-blue-600 text-white transition-colors flex items-center justify-center hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
          >
            {t('viewProducts')}
          </Link>
          <Link
            href='/about'
            className='rounded-full border border-solid border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-50 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
          >
            {t('aboutUs')}
          </Link>
        </div>
      </main>
    </div>
  )
}
