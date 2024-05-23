import { useEffect } from 'react'
import { pick, isEmpty, reject, filter, equals } from 'ramda'

import type { TSocialItem, TDashboardBaseInfoRoute, TMediaReport } from '@/spec'
import { toJS } from '@/mobx'
import useDashboard from '@/hooks/useDashboard'
import useQuery from '@/hooks/useQuery'

import type { TSettingField } from '../spec'
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
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useBaseInfo = (): TRet => {
  const { dashboard } = useDashboard()
  const { anyChanged } = useHelper()

  const { curCommunity, socialLinks, mediaReports, initSettings, updateBaseInfo } = dashboard

  const { data } = useQuery(S.communityBaseInfo, {
    slug: curCommunity.slug,
    incViews: false,
  })

  useEffect(() => {
    if (data?.community) updateBaseInfo(data.community)
  }, [data, updateBaseInfo])

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
    ...pick(BASEINFO_KEYS, dashboard),
    ...pick(['baseInfoTab', 'queringMediaReportIndex', 'loading', 'saving'], dashboard),
    socialLinks: reject((item: TSocialItem) => isEmpty(item.type), toJS(socialLinks)),
    mediaReports: toJS(mediaReports),
    isTouched: anyChanged(BASEINFO_KEYS as TSettingField[]),
    isSocialLinksTouched: socialLinksTouched(),
    isMediaReportsTouched: mediaReportsTouched(),
  } as TRet
}

export default useBaseInfo
