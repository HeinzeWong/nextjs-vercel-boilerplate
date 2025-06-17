'use client'

import { useTranslations } from "next-intl"
import { useState, useEffect, Suspense } from "react"

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
    const interval = setInterval(fetchPrice, 30000) // 30秒刷新一次
    
    return () => clearInterval(interval)
  }, [productId])

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {/* 价格骨架 */}
        <div className="flex items-center space-x-3">
          <div className="h-8 bg-gray-200 rounded-md w-32"></div>
          <div className="h-6 bg-gray-200 rounded-md w-20"></div>
        </div>
        {/* 更新时间骨架 */}
        <div className="h-4 bg-gray-200 rounded-md w-40"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500">
        {t('priceError')}
      </div>
    )
  }

  if (!priceData) {
    return null
  }

  return (
    <div className="space-y-2">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-green-600 font-medium">💰 实时价格</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Live</span>
        </div>
        <div className="text-2xl font-bold text-green-600">
          {t('priceLabel')}{priceData?.currency} {priceData?.price.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">
          {t('lastUpdated')}{new Date(priceData?.lastUpdated || '').toLocaleString()}
        </div>
        <div className="text-xs text-green-600 mt-1">
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
