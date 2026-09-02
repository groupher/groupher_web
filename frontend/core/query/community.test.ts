import { QueryClient } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'

import type { TCommunity } from '~/spec'

import { communityKeys, patchCommunityConfig, projectCommunityConfig } from './community'

describe('community confirmed owner', () => {
  it('drops dashboard and viewer fields from the canonical public Query value', () => {
    const projected = projectCommunityConfig({
      slug: 'home',
      title: 'Home',
      dashboard: { baseInfo: { title: 'duplicate' } },
      viewerHasSubscribed: true,
    } as TCommunity)

    expect(projected).toEqual({ slug: 'home', title: 'Home' })
  })

  it('patches the canonical Query key instead of mutating its Valtio projection', () => {
    const queryClient = new QueryClient()
    queryClient.setQueryData(communityKeys.config('home'), { slug: 'home', title: 'Before' })

    patchCommunityConfig(queryClient, 'home', { title: 'After' })

    expect(queryClient.getQueryData(communityKeys.config('home'))).toEqual({
      slug: 'home',
      title: 'After',
    })
  })
})
