import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick, isEmpty, reject, filter } from 'ramda'

import type { TSocialItem, TDashboardBaseInfoRoute, TMediaReport } from '@/spec'
import { toJS } from '@/mobx'

import type { TSettingField } from '../spec'
import useHelper from './useHelper'
import { BASEINFO_KEYS } from '../constant'

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

  addMediaReport: () => void
  mediaReportOnChange: (index: number, url: string) => void
  removeMediaReport: (index: number) => void
  queryOpenGraphInfo: (item: TMediaReport) => void
}

const useBaseInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { anyChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { socialLinks, mediaReports, initSettings } = store.dashboardThread

  // TODO: move to touched ?
  const mediaReportsTouched = () => {
    const curValues = reject((item: TMediaReport) => !item.editUrl, toJS(mediaReports))
    const initValues = reject(
      (item: TMediaReport) => !item.editUrl,
      toJS(initSettings.mediaReports),
    )

    const curValueTitles = filter((item: TMediaReport) => !isEmpty(item?.title), curValues)
    const isCurAllvalid = curValueTitles.length !== 0 && curValueTitles.length === curValues.length

    return isCurAllvalid && JSON.stringify(curValues) !== JSON.stringify(initValues)
  }

  const socialLinksTouched = () =>
    JSON.stringify(toJS(socialLinks)) !== JSON.stringify(toJS(initSettings.socialLinks))

  return {
    ...pick(BASEINFO_KEYS, store.dashboardThread),
    ...pick(['baseInfoTab', 'queringMediaReportIndex', 'loading', 'saving'], store.dashboardThread),
    socialLinks: reject((item: TSocialItem) => isEmpty(item.type), toJS(socialLinks)),
    mediaReports: toJS(mediaReports),
    isTouched: anyChanged(BASEINFO_KEYS as TSettingField[]),
    isSocialLinksTouched: socialLinksTouched(),
    isMediaReportsTouched: mediaReportsTouched(),
  } as TRet
}

export default useBaseInfo
