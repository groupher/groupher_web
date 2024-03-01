// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // 根据需求定制缓存时间。这里的604800秒相当于一周。
  const CACHE_DURATION = 60 * 60 * 24 * 7 // seconds

  if (url.pathname === '/book-demo') {
    const response = NextResponse.next()
    response.headers.set(
      'Cache-Control',
      `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION}`,
    )
    return response
  }
}

export const config = {
  matcher: '/book-demo',
}
