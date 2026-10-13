import { GROUPHER_AUTH_SIGNED_IN_COOKIE } from '@groupher/contracts/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import type { TUser } from '~/spec'

import useAccount from './hooks'
import Provider from './provider'

const sessionUser: TUser = {
  avatar: 'https://static.groupher.com/icons/cmd/alien_user3.svg',
  login: 'e2e',
  nickname: 'E2E User',
}

const wrapperFor = (queryClient: QueryClient, user: TUser | null = null) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <Provider initData={{ loading: false, user }}>{children}</Provider>
    </QueryClientProvider>
  )
}

describe('stores/account/provider', () => {
  beforeEach(() => {
    document.cookie = `${GROUPHER_AUTH_SIGNED_IN_COOKIE}=1; Path=/`
  })

  afterEach(() => {
    document.cookie = `${GROUPHER_AUTH_SIGNED_IN_COOKIE}=; Max-Age=0; Path=/`
    vi.unstubAllGlobals()
  })

  it('probes the real session query after hydration when the signed-in hint has an anonymous seed', async () => {
    const request = vi.fn().mockResolvedValue(
      Response.json({
        data: { sessionState: { isValid: true, user: sessionUser } },
      }),
    )
    vi.stubGlobal('fetch', request)
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    const { result } = renderHook(() => useAccount(), {
      wrapper: wrapperFor(queryClient),
    })

    await waitFor(() => expect(request).toHaveBeenCalledOnce())
    await waitFor(() => expect(result.current.user?.login).toBe('e2e'))
    expect(result.current.isLogin).toBe(true)
  })

  it('keeps a resolved SSR user without probing again', async () => {
    const request = vi.fn()
    vi.stubGlobal('fetch', request)
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    const { result } = renderHook(() => useAccount(), {
      wrapper: wrapperFor(queryClient, sessionUser),
    })

    await waitFor(() => expect(result.current.user?.login).toBe('e2e'))
    expect(request).not.toHaveBeenCalled()
  })

  it('keeps an anonymous browser request-free when the signed-in hint is absent', async () => {
    document.cookie = `${GROUPHER_AUTH_SIGNED_IN_COOKIE}=; Max-Age=0; Path=/`
    const request = vi.fn()
    vi.stubGlobal('fetch', request)
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    const { result } = renderHook(() => useAccount(), {
      wrapper: wrapperFor(queryClient),
    })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.isLogin).toBe(false)
    expect(request).not.toHaveBeenCalled()
  })
})
