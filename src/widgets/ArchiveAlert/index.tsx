/*
 *
 * ArchiveAlert
 *
 */

import { type FC, memo } from 'react'

import type { TSpace } from '@/spec'

import NoticeBar from '@/widgets/NoticeBar'

type TProps = {
  date?: string
} & TSpace

const ArchiveAlert: FC<TProps> = ({ date = '', ...restProps }) => {
  const dateString = new Date(date).toLocaleString()
  return (
    <NoticeBar
      type="archived"
      content={`本帖已于 ${dateString} 被存档, 目前为只读状态。`}
      {...restProps}
    />
  )
}

export default memo(ArchiveAlert)
