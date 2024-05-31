import { useEffect } from 'react'
import { pick, isEmpty } from 'ramda'

import type { TCommunity, TDashboardBaseInfoRoute, TEditValue } from '@/spec'
import { toJS, runInAction } from '@/mobx'
import useDashboard from '@/hooks/useDashboard'
import useQuery from '@/hooks/useQuery'

import type { TSettingField } from '@/stores2/dashboardStore/spec'

import useHelper from '../useHelper'
import { BASEINFO_KEYS } from '../../constant'
import S from '../../schema'

import useInfo, { type TRet as TUseInfo } from './useInfo'
import useLogos, { type TRet as TUseLogos } from './useLogos'
import useSocialLinks, { type TRet as TUseSocialLinks } from './useSocialLinks'
import useMediaReports, { type TRet as TUseMediaReports } from './useMediaReports'
import useDangerZone, { type TRet as TUseDangerZone } from './useDangerZone'

type TRet = TUseInfo &
  TUseLogos &
  TUseMediaReports &
  TUseSocialLinks &
  TUseDangerZone & {
    loading: boolean
    saving: boolean

    baseInfoTab: TDashboardBaseInfoRoute
    edit: (value: TEditValue, field: TSettingField) => void
  }

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useBaseInfo = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { edit } = useHelper()

  const { curCommunity } = store
  const useInfoData = useInfo()
  const useLogosData = useLogos()
  const useMediaReportsData = useMediaReports()
  const useSocialLinksData = useSocialLinks()
  const useDangerZoneData = useDangerZone()

  const { data } = useQuery(S.communityBaseInfo, {
    slug: curCommunity.slug,
    incViews: false,
  })

  useEffect(() => {
    if (data?.community && !store.initFilled) {
      store.initFilled = true
      // to avoid hooks rerender which update baseinfo
      updateBaseInfo(data.community)
    }
  }, [data])

  const updateBaseInfo = (community: TCommunity): void => {
    const { dashboard } = community
    const { baseInfo, mediaReports } = dashboard

    const updates = BASEINFO_KEYS.reduce((acc, key) => {
      acc[key] = baseInfo[key]
      return acc
    }, {})

    let initMediaReports = []

    if (!isEmpty(mediaReports)) {
      initMediaReports = mediaReports.map((item, index) => ({
        ...item,
        editUrl: item.url,
        index: item.index || index,
      }))
    }

    runInAction(() => {
      Object.assign(store, updates)
      Object.assign(store.initSettings, updates)

      store.mediaReports = initMediaReports
      store.initSettings.mediaReports = initMediaReports
    })
  }

  return {
    edit,
    ...pick(['baseInfoTab', 'loading', 'saving'], store),
    ...useInfoData,
    ...useLogosData,
    ...useSocialLinksData,
    ...useMediaReportsData,
    ...useDangerZoneData,
  }
}

export default useBaseInfo
