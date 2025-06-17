// 使用 const assertions 定义常量
const REGION_VALUES = {
  CN: 'cn',
  JP: 'jp', 
  US: 'us'
} as const

const LOCALE_VALUES = {
  ZH: 'zh',
  JA: 'ja',
  EN: 'en'
} as const

// 导出类型和常量
export type Region = typeof REGION_VALUES[keyof typeof REGION_VALUES]
export type Locale = typeof LOCALE_VALUES[keyof typeof LOCALE_VALUES]

export const REGIONS = Object.values(REGION_VALUES)
export const LOCALES = Object.values(LOCALE_VALUES)

// 配置对象 - 统一管理地区相关配置
const createLocaleConfig = () => {
  const { CN, JP, US } = REGION_VALUES
  const { ZH, JA, EN } = LOCALE_VALUES
  
  return {
    [CN]: {
      supportedLocales: [ZH, EN, JA],
      defaultLocale: ZH
    },
    [JP]: {
      supportedLocales: [JA, EN, ZH],
      defaultLocale: JA
    },
    [US]: {
      supportedLocales: [EN, ZH, JA],
      defaultLocale: EN
    }
  } as const
}

export const LOCALE_CONFIG = createLocaleConfig()

// 默认地区
export const DEFAULT_REGION = REGION_VALUES.CN