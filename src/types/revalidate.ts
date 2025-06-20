export interface RevalidateRequest {
  /** 要清除缓存的路径，例如 '/products' 或 '/products/123' */
  path?: string
  /** 要清除缓存的标签，例如 'products' 或 'product-123' */
  tag?: string
  /** 可选的密钥用于验证请求 */
  secret?: string
}

export interface RevalidateResponse {
  /** 是否成功清除缓存 */
  revalidated: boolean
  /** 清除缓存的时间戳 */
  now: number
  /** 操作结果描述 */
  results: string[]
}

export interface RevalidateErrorResponse {
  /** 错误信息 */
  message: string
} 