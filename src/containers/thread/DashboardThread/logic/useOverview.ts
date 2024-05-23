import { useEffect } from 'react'

import type { TOverview, TCommunity } from '@/spec'
import useDashboard from '@/hooks/useDashboard'
import useQuery from '@/hooks/useQuery'

import S from '../schema'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useOverview = (): TOverview => {
  const { dashboard } = useDashboard()
  const { curCommunity, overview } = dashboard

  const { data } = useQuery(S.communityOverview, {
    slug: curCommunity.slug,
    incViews: false,
  })

  const updateOverview = (community: TCommunity): void => {
    const { meta, views, subscribersCount } = community

    dashboard.overview = {
      views,
      subscribersCount,
      ...meta,
    }
  }

  useEffect(() => {
    if (data?.community) updateOverview(data.community)
  }, [data, updateOverview])

  return overview
}

export default useOverview
