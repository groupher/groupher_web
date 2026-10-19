import { GATE_ACTION } from '@groupher/contracts/gate'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'

import AccountStoreProvider from '~/stores/account/provider'

import useGate from '.'

const wrapperFor = (passport?: Record<string, unknown>) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <AccountStoreProvider
        initData={{ loading: false, user: { login: 'alice', passport: passport as never } }}
      >
        {children}
      </AccountStoreProvider>
    </QueryClientProvider>
  )
}

describe('useGate', () => {
  it('allows a generated global Passport action', () => {
    const { result } = renderHook(() => useGate(), {
      wrapper: wrapperFor({ global: { [GATE_ACTION.COMMUNITY_APPLICATION_REVIEW]: true } }),
    })

    expect(result.current.can(GATE_ACTION.COMMUNITY_APPLICATION_REVIEW)).toBe(true)
    expect(result.current.can(GATE_ACTION.COMMUNITY_APPLICATION_APPROVE)).toBe(false)
  })

  it('allows god and community root passports', () => {
    const god = renderHook(() => useGate(), {
      wrapper: wrapperFor({ global: { god: true } }),
    })
    const root = renderHook(() => useGate(), {
      wrapper: wrapperFor({ global: {}, home: { root: true } }),
    })

    expect(god.result.current.can(GATE_ACTION.COMMUNITY_APPLICATION_APPROVE)).toBe(true)
    expect(root.result.current.can(GATE_ACTION.DOC_UPDATE, { community: 'home' })).toBe(true)
  })

  it('uses generated grants, owner fallbacks, and thread grants', () => {
    const moderator = renderHook(() => useGate(), {
      wrapper: wrapperFor({
        global: { 'post.community.move': true },
        home: { cms: { 'doc.edit': true } },
      }),
    })

    expect(moderator.result.current.can(GATE_ACTION.DOC_UPDATE, { community: 'home' })).toBe(true)
    expect(moderator.result.current.can(GATE_ACTION.COMMENT_UPDATE, { owner: true })).toBe(true)
    expect(moderator.result.current.can(GATE_ACTION.COMMUNITY_UPDATE, { owner: true })).toBe(false)
    expect(moderator.result.current.can(GATE_ACTION.ARTICLE_MOVE, { thread: 'post' })).toBe(true)
  })
})
