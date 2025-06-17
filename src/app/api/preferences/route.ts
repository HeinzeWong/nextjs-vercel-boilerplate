import { NextRequest, NextResponse } from 'next/server'
import { REGIONS, LOCALES, COOKIE_KEYS, COOKIE_CONFIG } from '@/src/libs/Cookies'

export async function POST(request: NextRequest) {
  try {
    const { region, locale } = await request.json()

    // 验证输入
    if (!REGIONS.includes(region as any) || !LOCALES.includes(locale as any)) {
      return NextResponse.json(
        { error: 'Invalid region or locale' },
        { status: 400 }
      )
    }

    // 创建响应并设置Cookie
    const response = NextResponse.json({ success: true })
    
    response.cookies.set(COOKIE_KEYS.USER_REGION, region, {
      maxAge: COOKIE_CONFIG.MAX_AGE,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    
    response.cookies.set(COOKIE_KEYS.USER_LOCALE, locale, {
      maxAge: COOKIE_CONFIG.MAX_AGE,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
} 