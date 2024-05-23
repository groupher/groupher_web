import { useContext, useEffect } from 'react'

// import type { TDashboardPath } from '@/spec'
import { useQuery } from 'urql'

import type { TOverview } from '@/containers/thread/DashboardThread/spec'

import S from '../schema'

import { StoreContext } from '@/stores2'

type TRes = TOverview

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useOverview = (): TRes => {
  const { dashboard } = useContext(StoreContext)
  const { curCommunity, updateOverview } = dashboard

  const [{ data, error }] = useQuery({
    query: S.communityOverview,
    variables: {
      slug: curCommunity.slug,
      incViews: false,
    },
    // requestPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data?.community) {
      updateOverview(data.community)
    }
  }, [data, updateOverview])

  return dashboard.overview
}

export default useOverview
