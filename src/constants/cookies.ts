// Cookie 键名常量
export const COOKIE_KEYS = {
  USER_SELECTED_REGION: 'preferred-region',
  USER_SELECTED_LOCALE: 'preferred-locale',
} as const

// Cookie 配置常量
export const COOKIE_CONFIG = {
  MAX_AGE: 30 * 24 * 60 * 60, // 30天（秒）
  EXPIRES_DAYS: 30, // 30天
} as const

// 地区和语言常量
export const REGIONS = ['cn', 'jp', 'us'] as const
export const LOCALES = ['zh', 'ja', 'en'] as const

export type Region = typeof REGIONS[number]
export type Locale = typeof LOCALES[number]

// 地区-语言映射关系
export const REGION_LOCALE_MAP: Record<Region, Locale[]> = {
  cn: ['zh', 'en'],
  jp: ['ja', 'en', 'zh'],
  us: ['en', 'zh', 'ja']
}

// 默认语言映射
export const DEFAULT_LOCALE_MAP: Record<Region, Locale> = {
  cn: 'zh',
  jp: 'ja',
  us: 'en'
} 