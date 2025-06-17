import { NextRequest, NextResponse } from 'next/server'

// 模拟价格数据 - 实际项目中这里应该连接你的价格数据源
const getPriceData = async (productId: string) => {
  // 这里可以连接数据库、第三方API等
  // 模拟实时价格变化
  const basePrice = 1000
  const randomVariation = Math.random() * 200 - 100 // ±100的变化
  const currentPrice = Math.round((basePrice + randomVariation) * 100) / 100

  return {
    price: currentPrice,
    currency: '¥',
    lastUpdated: new Date().toISOString(),
    productId
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    
    // 获取实时价格数据
    const priceData = await getPriceData(productId)
    
    // 设置响应头确保不缓存
    return NextResponse.json(priceData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Price fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price data' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        }
      }
    )
  }
} 