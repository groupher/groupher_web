import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// import { themeMiddleware } from './middlewares/theme'
import { queryWhitelistMiddleware } from './middlewares/query-whitelist'
import { oopsMiddleware } from './middlewares/oops'
import { avoidScanMiddleware } from './middlewares/avoid-scan'

function applyMiddleware(middlewareFns, req) {
  for (const middlewareFn of middlewareFns) {
    const response = middlewareFn(req)
    // 如果中间件执行结果是重定向或重写，那么就返回该响应并且不再执行后续中间件

    if (response instanceof NextResponse) {
      // 检查状态码是否代表重定向
      if (response.status >= 300 && response.status < 400) {
        return response
      }
    }
  }

  // 如果没有中间件返回重定向的NextResponse，就继续处理请求
  return NextResponse.next()
}

export function middleware(request: NextRequest) {
  // 这里我们创建一个数组，按期望的执行顺序包含所有的中间件函数
  const middlewareFunctions = [
    avoidScanMiddleware,
    oopsMiddleware,
    queryWhitelistMiddleware,
    // ... 添加更多中间件函数
  ]

  // 使用applyMiddleware函数来执行中间件
  return applyMiddleware(middlewareFunctions, request)
}
