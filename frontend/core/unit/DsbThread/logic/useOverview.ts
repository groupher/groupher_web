import { useQuery } from '@tanstack/react-query'

import { graphqlQueryOptions } from '~/query'
import type { TOverview } from '~/spec'
import useCommunity from '~/stores/community/hooks'
import S from '~/unit/DsbThread/schema/shell'

type TCommunityOverview = {
  views: number | null
  subscribersCount: number | null
  meta?: Omit<TOverview, 'views' | 'subscribersCount'> | null
}

/** Exposes overview state and actions through the shared React hook boundary. */
export default function useOverview(): TOverview {
  const { slug } = useCommunity()

  const { data } = useQuery(graphqlQueryOptions(S.communityOverview, { slug, incViews: false }))
  const community = (data as { community?: TCommunityOverview | null } | undefined)?.community

  return community
    ? {
        views: community.views ?? 0,
        subscribersCount: community.subscribersCount ?? 0,
        postsCount: community.meta?.postsCount ?? 0,
        changelogsCount: community.meta?.changelogsCount ?? 0,
        docsCount: community.meta?.docsCount ?? 0,
      }
    : {
        views: 0,
        subscribersCount: 0,
        postsCount: 0,
        changelogsCount: 0,
        docsCount: 0,
      }
}
