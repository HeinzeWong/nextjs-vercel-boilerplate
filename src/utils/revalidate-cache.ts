import type { RevalidateRequest, RevalidateResponse, RevalidateErrorResponse } from '@/src/types/revalidate'

/**
 * 清除指定路径的SSG缓存
 * @param path 要清除缓存的路径
 * @param secret 可选的验证密钥
 * @returns 清除结果
 */
export async function revalidatePath(
  path: string,
  secret?: string
): Promise<RevalidateResponse | RevalidateErrorResponse> {
  return revalidateCache({ path, secret })
}

/**
 * 清除指定标签的SSG缓存
 * @param tag 要清除缓存的标签
 * @param secret 可选的验证密钥
 * @returns 清除结果
 */
export async function revalidateTag(
  tag: string,
  secret?: string
): Promise<RevalidateResponse | RevalidateErrorResponse> {
  return revalidateCache({ tag, secret })
}

/**
 * 通用的缓存清理函数
 * @param params 清理参数
 * @returns 清理结果
 */
export async function revalidateCache(
  params: RevalidateRequest
): Promise<RevalidateResponse | RevalidateErrorResponse> {
  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    const data = await response.json()

    if (!response.ok) {
      return data as RevalidateErrorResponse
    }

    return data as RevalidateResponse
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Failed to revalidate cache'
    }
  }
}

/**
 * 使用GET方法清除缓存（适用于简单的URL调用）
 * @param path 路径
 * @param tag 标签
 * @param secret 密钥
 * @returns 清除结果
 */
export async function revalidateCacheViaGet(
  path?: string,
  tag?: string,
  secret?: string
): Promise<RevalidateResponse | RevalidateErrorResponse> {
  try {
    const params = new URLSearchParams()
    if (path) params.append('path', path)
    if (tag) params.append('tag', tag)
    if (secret) params.append('secret', secret)

    const response = await fetch(`/api/revalidate?${params.toString()}`)
    const data = await response.json()

    if (!response.ok) {
      return data as RevalidateErrorResponse
    }

    return data as RevalidateResponse
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Failed to revalidate cache'
    }
  }
} 