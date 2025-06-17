import { NextRequest, NextResponse } from 'next/server'
import {
  REGIONS,
  COOKIE_KEYS,
  COOKIE_CONFIG,
  type Region,
  type Locale,
  LOCALE_CONFIG
} from './libs'

// 通过IP检测地区（简化版本，实际项目中建议使用Cloudflare等服务）
function detectRegionFromIP(request: NextRequest): Region {
  // 在实际项目中，这里应该使用Cloudflare的CF-IPCountry头或其他地理位置服务
  const country = request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country')

  switch (country?.toLowerCase()) {
    case 'cn':
      return 'cn'
    case 'jp':
      return 'jp'
    default:
      return 'us'
  }
}

// 验证并调整地区和语言组合
function validateAndAdjust(region: string, locale: string): { region: Region; locale: Locale } {
  const validRegion = REGIONS.includes(region as Region) ? (region as Region) : 'us'
  const validLocales = LOCALE_CONFIG[validRegion].supportedLocales
  const validLocale = validLocales.includes(locale as Locale)
    ? (locale as Locale)
    : LOCALE_CONFIG[validRegion].defaultLocale

  return { region: validRegion, locale: validLocale }
}

export async function middleware(request: NextRequest) {
  let { pathname } = request.nextUrl

  // // 跳过静态文件和API路由
  // if (
  //   pathname.startsWith('/_next/') ||
  //   pathname.startsWith('/api/') ||
  //   pathname.includes('.') ||
  //   pathname.startsWith('/favicon')
  // ) {
  //   return NextResponse.next()
  // }

  // 检查当前路径是否已经包含地区和语言
  // const pathSegments = pathname.split('/').filter(Boolean)
  // const isRegionLocalePath = pathSegments.length >= 2 && 
  //   REGIONS.includes(pathSegments[0] as Region) && 
  //   LOCALES.includes(pathSegments[1] as Locale)

  // if (isRegionLocalePath) {
  //   // 路径已经正确，直接继续
  //   return NextResponse.next()
  // }
  // 如果pathname第一项是region，则取出
  const pathSegments = pathname.split('/').filter(Boolean)
  const pathRegion = REGIONS.includes(pathSegments[0] as Region) ? pathSegments[0] as Region : null

  // 如果是region，则取出region，并改写pathname，然后继续走后面的逻辑
  if (pathRegion) {
    pathname = `/${pathSegments.slice(1).join('/')}`
  }

  // 1. 检查用户偏好（Cookie）
  const userRegion = request.cookies.get(COOKIE_KEYS.USER_REGION)?.value
  const userLocale = request.cookies.get(COOKIE_KEYS.USER_LOCALE)?.value

  // console.log('userRegion', userRegion, 'userLocale', userLocale)

  // 2. 自动检测地区
  const detectedRegion = detectRegionFromIP(request)

  const computedRegion = pathRegion || userRegion || detectedRegion

  // 3. 验证并调整
  const { region, locale } = validateAndAdjust(
    computedRegion,
    userLocale || LOCALE_CONFIG[computedRegion as Region].defaultLocale
  )

  // 4. 重写路由到地区/语言路径
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${region}/${locale}${pathname}`

  const response = NextResponse.rewrite(newUrl)

  // 5.如果有locale或者region，则设置cookie
  response.cookies.set(COOKIE_KEYS.USER_REGION, region, {
    expires: Date.now() + COOKIE_CONFIG.EXPIRES_SECONDS,
  })

  // if (userLocale) {
  //   response.cookies.set(COOKIE_KEYS.USER_REGION, region, {
  //     expires: Date.now() + COOKIE_CONFIG.EXPIRES_SECONDS,
  //   })
  // }
  

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - locales目录下的多语言文件（多语言文件不走middleware）
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 