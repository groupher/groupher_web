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
import useHelper from '../useHelper'
import { BASEINFO_KEYS, EMPTY_MEDIA_REPORT } from '../../constant'

import S from '../../schema'

export type TRet = {
  queringMediaReportIndex: number | null

  mediaReports: TMediaReport[]
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
const useMediaReports = (): TRet => {
  const { dashboard: store } = useDashboard()

  const { mediaReports, initSettings, queringMediaReportIndex } = store

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
    queringMediaReportIndex,
    mediaReports: toJS(mediaReports),
    isMediaReportsTouched: mediaReportsTouched(),
    addMediaReport,
    mediaReportOnChange,
    removeMediaReport,
    queryOpenGraphInfo,
  } as TRet
}

export default useMediaReports
