/*
 *
 * Pagi
 *
 */

import { FC, ReactNode } from 'react'
import dynamic from 'next/dynamic'

import type { TSpace } from '@/spec'

import { buildLog } from '@/utils/logger'

import { EmptyWrapper, BottomMsg } from './styles'

const RealPagi = dynamic(() => import('./RealPagi'))

/* eslint-disable-next-line */
const log = buildLog('w:Pagi:index')

export type TProps = {
  children?: ReactNode
  type?: 'bottom' | 'center'
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  totalPages?: number
  emptyMsg?: string
  noMoreMsg?: string
  showBottomMsg?: boolean
  onChange?: (page: number) => void
} & TSpace

const hasExtraPage = (totalCount, pageSize) => totalCount > pageSize

const BottomFooter = ({ show, msg }) => {
  if (show) return <BottomMsg>{msg}</BottomMsg>
  return <div />
}

const Pagi: FC<TProps> = ({
  pageNumber = 0,
  pageSize = 0,
  totalCount = 0,
  totalPages = 0,
  onChange = log,

  showBottomMsg = false,
  emptyMsg = '还没有讨论',
  noMoreMsg = '没有更多讨论了',

  ...restProps
}) => {
  const handlePageChange = (page: number) => {
    onChange(page)
  }

  if (totalCount === 0) {
    return (
      <EmptyWrapper {...restProps}>
        <BottomFooter show={showBottomMsg} msg={emptyMsg} />
      </EmptyWrapper>
    )
  }

  return (
    <>
      {hasExtraPage(totalCount, pageSize) ? (
        <RealPagi
          pageNumber={pageNumber}
          totalCount={totalCount}
          totalPages={totalPages}
          onChange={handlePageChange}
          {...restProps}
        />
      ) : (
        <EmptyWrapper {...restProps}>
          <BottomFooter show={showBottomMsg} msg={noMoreMsg} />
        </EmptyWrapper>
      )}
    </>
  )
}

export default Pagi as FC<TProps>
