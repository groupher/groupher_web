import { useEffect } from 'react'
import { pick, isEmpty } from 'ramda'

import type { TCommunity, TDashboardBaseInfoRoute, TEditValue } from '@/spec'
import { toJS, runInAction } from '@/mobx'
import useDashboard from '@/hooks/useDashboard'
import useQuery from '@/hooks/useQuery'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useHelper from '../useHelper'
import { BASEINFO_KEYS, EMPTY_MEDIA_REPORT } from '../../constant'

import S from '../../schema'

import useSocialLinks, { type TRet as TUseSocialLinks } from './useSocialLinks'
import useMediaReports, { type TRet as TUseMediaReports } from './useMediaReports'

type TRet = {
  loading: boolean
  saving: boolean

  favicon: string
  logo: string
  locale: string
  title: string
  desc: string
  introduction: string
  homepage: string
  slug: string
  city: string
  techstack: string

  baseInfoTab: TDashboardBaseInfoRoute

  isTouched: boolean
  edit: (value: TEditValue, field: TSettingField) => void
} & TUseMediaReports &
  TUseSocialLinks

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useBaseInfo = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { anyChanged, edit } = useHelper()

  const { curCommunity, initSettings } = store
  const mediaReportsData = useMediaReports()
  const socialLinksData = useSocialLinks()

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
    ...pick(BASEINFO_KEYS, store),
    ...pick(['baseInfoTab', 'loading', 'saving'], store),
    isTouched: anyChanged(BASEINFO_KEYS as TSettingField[]),
    edit,
    ...socialLinksData,
    ...mediaReportsData,
  } as TRet
}

export default useBaseInfo
