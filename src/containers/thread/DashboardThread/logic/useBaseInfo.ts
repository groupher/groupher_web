import { useEffect } from 'react'
import { pick, isEmpty, reject, filter, equals } from 'ramda'

import type {
  TCommunity,
  TSocialItem,
  TDashboardBaseInfoRoute,
  TMediaReport,
  TEditValue,
} from '@/spec'
import { toJS, runInAction } from '@/mobx'
import useDashboard from '@/hooks/useDashboard'
import useQuery from '@/hooks/useQuery'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useHelper from './useHelper'
import { BASEINFO_KEYS } from '../constant'

import S from '../schema'

type TRet = {
  loading: boolean
  queringMediaReportIndex: number | null
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

  socialLinks: TSocialItem[]
  baseInfoTab: TDashboardBaseInfoRoute
  mediaReports: TMediaReport[]

  isTouched: boolean
  isSocialLinksTouched: boolean
  isMediaReportsTouched: boolean

  edit: (value: TEditValue, field: TSettingField) => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useBaseInfo = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { anyChanged, edit } = useHelper()

  const { curCommunity, socialLinks, mediaReports, initSettings } = store

  const { data } = useQuery(S.communityBaseInfo, {
    slug: curCommunity.slug,
    incViews: false,
  })

  useEffect(() => {
    if (data?.community) updateBaseInfo(data.community)
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

  const mediaReportsTouched = () => {
    const curValues = reject((item: TMediaReport) => !item.editUrl, toJS(mediaReports))
    const initValues = reject(
      (item: TMediaReport) => !item.editUrl,
      toJS(initSettings.mediaReports),
    )

    const curValueTitles = filter((item: TMediaReport) => !isEmpty(item?.title), curValues)
    const isCurAllvalid = curValueTitles.length !== 0 && curValueTitles.length === curValues.length

    return isCurAllvalid && !equals(curValues, initValues)
  }

  const socialLinksTouched = () => {
    return !equals(toJS(socialLinks), toJS(initSettings.socialLinks))
  }

  return {
    ...pick(BASEINFO_KEYS, store),
    ...pick(['baseInfoTab', 'queringMediaReportIndex', 'loading', 'saving'], store),
    socialLinks: reject((item: TSocialItem) => isEmpty(item.type), toJS(socialLinks)),
    mediaReports: toJS(mediaReports),
    isTouched: anyChanged(BASEINFO_KEYS as TSettingField[]),
    isSocialLinksTouched: socialLinksTouched(),
    isMediaReportsTouched: mediaReportsTouched(),
    edit,
  } as TRet
}

export default useBaseInfo
