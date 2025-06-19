import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import RegionSelector from '@/src/components/RegionSelector/index'
import type { Locale, Region } from '@/src/libs'
import styles from './index.module.scss'
  
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
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
        {/* 地区语言选择器 */}
        <RegionSelector currentRegion={region} currentLocale={locale} />

        <h1 className={styles.title}>
          {t('title')}
        </h1>

        <p className={styles.description}>
          {t('description', { region, locale })}
        </p>

        <ol className={styles.stepsList}>
          <li>{t('step1')}</li>
          <li>{t('step2')}</li>
        </ol>

        {/* 导航链接 */}
        <div className={styles.navigation}>
          <Link
            href='/products'
            className={styles.primaryButton}
          >
            {t('viewProducts')}
          </Link>
          <Link
            href='/about'
            className={styles.secondaryButton}
          >
            {t('aboutUs')}
          </Link>
        </div>
      </main>
    </div>
  )
}
