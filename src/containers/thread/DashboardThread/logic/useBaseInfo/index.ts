import { useEffect } from 'react'
import { pick, isEmpty } from 'ramda'

import type { TCommunity, TDashboardBaseInfoRoute, TEditValue } from '@/spec'
import useSubStore from '@/hooks/useSubStore'
import useViewingCommunity from '@/hooks/useViewingCommunity'
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

export default (): TRet => {
  const store = useSubStore('dashboard')

  const curCommunity = useViewingCommunity()
  const { edit } = useHelper()

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
      store.commit({ initFilled: true })
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

    const initSettings = { ...store.initSettings, ...updates, mediaReports: initMediaReports }
    store.commit({ ...updates, mediaReports: initMediaReports, initSettings })

    // runInAction(() => {
    //   Object.assign(store, updates)
    //   Object.assign(store.initSettings, updates)

    //   store.mediaReports = initMediaReports
    //   store.initSettings.mediaReports = initMediaReports
    // })
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
