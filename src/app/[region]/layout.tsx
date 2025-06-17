import { ReactNode } from 'react'

interface RegionLayoutProps {
  children: ReactNode
  params: Promise<{
    region: string
  }>
}

// 地区相关配置
const regionConfig = {
  cn: {
    currency: 'CNY',
    timezone: 'Asia/Shanghai',
  },
  jp: {
    currency: 'JPY',
    timezone: 'Asia/Tokyo',
  },
  us: {
    currency: 'USD',
    timezone: 'America/New_York',
  },
}

export default async function RegionLayout({ children, params }: RegionLayoutProps) {
  const { region } = await params
  const config = regionConfig[region as keyof typeof regionConfig] || regionConfig.us

  return (
    <div data-region={region} data-currency={config.currency} data-timezone={config.timezone}>
      {children}
    </div>
  )
} 