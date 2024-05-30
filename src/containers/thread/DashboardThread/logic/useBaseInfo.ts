import { useEffect } from 'react'
import { pick, isEmpty, find, reject, filter, equals, mergeRight } from 'ramda'

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
import { BASEINFO_KEYS, EMPTY_MEDIA_REPORT } from '../constant'

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
  addMediaReport: () => void
  mediaReportOnChange: (index: number, url: string) => void
  removeMediaReport: (index: number) => void
  queryOpenGraphInfo: (item: TMediaReport) => void
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

  const addMediaReport = (): void => {
    const { mediaReports } = store
    const newReport = mergeRight(EMPTY_MEDIA_REPORT, { index: new Date().getTime() })

    store.mediaReports = [...toJS(mediaReports), newReport]
  }

  const mediaReportOnChange = (index: number, url: string): void => {
    const { mediaReports } = store

    const restReports = reject((item: TMediaReport) => item.index === index, mediaReports)
    const report = find((item: TMediaReport) => item.index === index, mediaReports)

    report.editUrl = url

    store.mediaReports = [...restReports, report]
  }

  const removeMediaReport = (index: number): void => {
    const { mediaReports } = store
    const newReports = reject((item: TMediaReport) => item.index === index, mediaReports)

    store.mark({ mediaReports: newReports })
    store.mediaReports = newReports
  }

  const queryOpenGraphInfo = (item: TMediaReport): void => {
    const { url, editUrl } = item

    console.log('## queryOpenGraphInfo TODO')
    // TODO
    return
    // if ((startsWith('https://', editUrl) || startsWith('http://', editUrl)) && url !== editUrl) {
    //   store.mark({ queringMediaReportIndex: item.index, loading: true })
    //   sr71$.query(S.openGraphInfo, { url: editUrl })
    // }
  }

  return {
    ...pick(BASEINFO_KEYS, store),
    ...pick(['baseInfoTab', 'queringMediaReportIndex', 'loading', 'saving'], store),
    socialLinks: reject((item: TSocialItem) => isEmpty(item.type), socialLinks),
    mediaReports: toJS(mediaReports),
    isTouched: anyChanged(BASEINFO_KEYS as TSettingField[]),
    isSocialLinksTouched: socialLinksTouched(),
    isMediaReportsTouched: mediaReportsTouched(),
    edit,
    // TOOD: move to useBaseInfo/useMediaReports
    addMediaReport,
    mediaReportOnChange,
    removeMediaReport,
    queryOpenGraphInfo,
  } as TRet
}

export default useBaseInfo
