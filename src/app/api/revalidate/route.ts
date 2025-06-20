import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { RevalidateRequest } from '@/src/types/revalidate'

export async function POST(request: NextRequest) {
  try {
    const body: RevalidateRequest = await request.json()
    
    // 可选：添加密钥验证以防止未授权的缓存清理
    const revalidateSecret = process.env.REVALIDATE_SECRET
    if (revalidateSecret && body.secret !== revalidateSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // 验证必需参数
    if (!body.path && !body.tag) {
      return NextResponse.json(
        { message: 'Either path or tag is required' },
        { status: 400 }
      )
    }

    const results: string[] = []

    // 按路径清除缓存
    if (body.path) {
      try {
        revalidatePath(body.path)
        results.push(`Revalidated path: ${body.path}`)
      } catch (error) {
        console.error(`Failed to revalidate path ${body.path}:`, error)
        return NextResponse.json(
          { message: `Failed to revalidate path: ${body.path}` },
          { status: 500 }
        )
      }
    }

    // 按标签清除缓存
    if (body.tag) {
      try {
        revalidateTag(body.tag)
        results.push(`Revalidated tag: ${body.tag}`)
      } catch (error) {
        console.error(`Failed to revalidate tag ${body.tag}:`, error)
        return NextResponse.json(
          { message: `Failed to revalidate tag: ${body.tag}` },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      results
    })

  } catch (error) {
    console.error('Revalidate API error:', error)
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// GET方法用于简单的路径验证（可选）
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  const tag = searchParams.get('tag')
  const secret = searchParams.get('secret')

  // 可选：添加密钥验证
  const revalidateSecret = process.env.REVALIDATE_SECRET
  if (revalidateSecret && secret !== revalidateSecret) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  if (!path && !tag) {
    return NextResponse.json(
      { message: 'Either path or tag query parameter is required' },
      { status: 400 }
    )
  }

  try {
    const results: string[] = []

    if (path) {
      revalidatePath(path)
      results.push(`Revalidated path: ${path}`)
    }

    if (tag) {
      revalidateTag(tag)
      results.push(`Revalidated tag: ${tag}`)
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      results
    })

  } catch (error) {
    console.error('Revalidate API error:', error)
    return NextResponse.json(
      { message: 'Failed to revalidate' },
      { status: 500 }
    )
  }
} 