import { useContext, useEffect } from 'react'

import useQuery from '@/hooks/useQuery'
import type { TOverview } from '@/containers/thread/DashboardThread/spec'

import { StoreContext } from '@/stores2'

import S from '../schema'

type TRes = TOverview

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useOverview = (): TRes => {
  const { dashboard } = useContext(StoreContext)
  const { curCommunity, updateOverview } = dashboard

  const { data, error } = useQuery(S.communityOverview, {
    slug: curCommunity.slug,
    incViews: false,
  })

  useEffect(() => {
    if (data?.community) updateOverview(data.community)
  }, [data, updateOverview])

  return dashboard.overview
}

export default useOverview
