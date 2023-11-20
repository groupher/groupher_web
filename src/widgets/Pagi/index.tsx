/*
 *
 * Pagi
 *
 */

import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

import type { TSpace, TPagi } from '@/spec'

import { buildLog } from '@/logger'

import { EmptyWrapper, BottomMsg } from './styles'

const RealPagi = dynamic(() => import('./RealPagi'))

/* eslint-disable-next-line */
const log = buildLog('w:Pagi:index')

export type TProps = {
  children?: ReactNode
  type?: 'bottom' | 'center'
  emptyMsg?: string
  noMoreMsg?: string
  showBottomMsg?: boolean
  onChange?: (page: number) => void
} & TPagi &
  TSpace

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
          pageSize={pageSize}
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

export default observer(Pagi)
