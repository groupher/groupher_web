import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// import { themeMiddleware } from './middlewares/theme'
import { queryWhitelistMiddleware } from './middlewares/query-whitelist'

export function middleware(request: NextRequest) {
  // const response = themeMiddleware(request)
  // if (response instanceof NextResponse) return response

  // whitelist the query parameters to improve CDN caching
  const response = queryWhitelistMiddleware(request)
  if (response instanceof NextResponse) return response

  // return response instanceof NextResponse ? response : NextResponse.next()

  return NextResponse.next()
}
