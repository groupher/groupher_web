/*
 *
 * Pagi
 *
 */

import type { FC, ReactNode } from 'react'

import type { TGraphQLPagiPageInfo, TSpace } from '~/spec'

import RealPagi from './RealPagi'
import type { TPagiLabels } from './RealPagi'
import useSalon, { cn } from './salon'

export type TProps = {
  labels?: TPagiLabels
  children?: ReactNode
  type?: 'bottom' | 'center'
  emptyMsg?: string
  noMoreMsg?: string
  showBottomMsg?: boolean
  onChange?: (page: number) => void
  pageInfo?: TGraphQLPagiPageInfo
} & TSpace

const Pagi: FC<TProps> = ({
  onChange = console.log,
  showBottomMsg = false,
  emptyMsg = '还没有讨论',
  noMoreMsg = '没有更多讨论了',
  pageInfo,
  labels,
  ...spacing
}) => {
  const s = useSalon({ ...spacing })

  const handlePageChange = (page: number) => {
    onChange(page)
  }

  if (!pageInfo || pageInfo.__typename !== 'OffsetPageInfo') return null

  if (pageInfo.totalCount === 0) {
    return (
      <div className={cn(s.wrapper, s.empty)}>
        {showBottomMsg && <div className={s.bottomMsg}>{emptyMsg}</div>}
      </div>
    )
  }

  return pageInfo.hasNextPage || pageInfo.hasPreviousPage ? (
    <RealPagi pageInfo={pageInfo} onChange={handlePageChange} labels={labels} {...spacing} />
  ) : (
    <div className={cn(s.wrapper, s.empty)}>
      {showBottomMsg && <div className={s.bottomMsg}>{noMoreMsg}</div>}
    </div>
  )
}

export default Pagi
