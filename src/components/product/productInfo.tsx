'use client'

import { useTranslations } from "next-intl"
import { useState, useEffect, Suspense } from "react"
import styles from "./index.module.scss"

interface PriceData {
  price: number
  currency: string
  lastUpdated: string
}

export const DynamicProductInfo = ({ productId }: { productId?: string }) => {
  const t = useTranslations("ProductDetail")
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true)
        // 调用你的价格API
        const response = await fetch(`/api/price/${productId || 'default'}`, {
          cache: 'no-store', // 确保不缓存
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch price')
        }
        
        const data = await response.json()
        setPriceData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()

    // 可选：设置定时刷新价格
    // const interval = setInterval(fetchPrice, 30000) // 30秒刷新一次
    
    // return () => clearInterval(interval)
  }, [productId])

  if (loading) {
    return (
      <div className={styles.loading}>
        {/* 价格骨架 */}
        <div className={styles.loadingHeader}>
          <div className={styles.loadingTitle}></div>
          <div className={styles.loadingStatus}></div>
        </div>
        {/* 更新时间骨架 */}
        <div className={styles.loadingSubtitle}></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        {t('priceError')}
      </div>
    )
  }

  if (!priceData) {
    return null
  }

  return (
    <div className={styles.content}>
      <div className={styles.priceCard}>
        <div className={styles.priceCardHeader}>
          <span className={styles.priceCardTitle}>💰 实时价格</span>
          <span className={styles.priceCardBadge}>Live</span>
        </div>
        <div className={styles.priceCardPrice}>
          {t('priceLabel')}{priceData?.currency} {priceData?.price.toLocaleString()}
        </div>
        <div className={styles.priceCardSubtitle}>
          {t('lastUpdated')}{new Date(priceData?.lastUpdated || '').toLocaleString()}
        </div>
        <div className={styles.priceCardTrend}>
          ⚡ 每次访问都会实时获取最新价格
        </div>
      </div>
    </div>
  )
}

export const SuspenseProductInfo = ({ productId }: { productId?: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicProductInfo productId={productId} />
    </Suspense>
  )
}
