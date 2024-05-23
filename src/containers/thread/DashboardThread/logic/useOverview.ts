import { useEffect } from 'react'

import type { TOverview } from '@/spec'
import useDashboard from '@/hooks/useDashboard'
import useQuery from '@/hooks/useQuery'

import S from '../schema'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useOverview = (): TOverview => {
  const { dashboard } = useDashboard()
  const { curCommunity, updateOverview, overview } = dashboard

  const { data, error } = useQuery(S.communityOverview, {
    slug: curCommunity.slug,
    incViews: false,
  })

  useEffect(() => {
    if (data?.community) updateOverview(data.community)
  }, [data, updateOverview])

  return overview
}

export default useOverview
