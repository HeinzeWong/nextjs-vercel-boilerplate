import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    region: string
    locale: string
  }>
}

export default async function ProductsPage({ params }: PageProps) {
  const { region, locale } = await params
  setRequestLocale(locale);
  const t = await getTranslations('Products')

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>{t('title')}</h1>
      <p className='text-gray-600 mb-4'>
        {t('description', { region, locale })}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* 示例产品卡片 */}
        <Link
          href='/products/1'
          className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow block'
        >
          <h3 className='font-semibold mb-2'>{t('product1.name')}</h3>
          <p className='text-gray-600'>{t('product1.description')}</p>
        </Link>
        <Link
          href='/products/2'
          className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow block'
        >
          <h3 className='font-semibold mb-2'>{t('product2.name')}</h3>
          <p className='text-gray-600'>{t('product2.description')}</p>
        </Link>
      </div>
    </div>
  )
}
