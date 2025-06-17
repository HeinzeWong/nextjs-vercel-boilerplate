// Cookie 键名常量
export const COOKIE_KEYS = {
  /* 用户选择的地区 */
  USER_REGION: 'tcgcard-selected-region',
  /* 用户选择的语言 */
  USER_LOCALE: 'tcgcard-selected-locale',
} as const

const EXPIRES_DAYS = 30

// Cookie 配置常量
export const COOKIE_CONFIG = {
  /* 30天 秒格式 */
  EXPIRES_SECONDS: EXPIRES_DAYS * 24 * 60 * 60,
  /* 30天 天格式 */
  EXPIRES_DAYS,
} as const
