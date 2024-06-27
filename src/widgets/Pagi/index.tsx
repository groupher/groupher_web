/*
 *
 * Pagi
 *
 */

import type { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSpace, TPagi } from '~/spec'

import usePagedPosts from '~/hooks/usePagedPosts'

import { EmptyWrapper, BottomMsg } from './styles'
import RealPagi from './RealPagi'

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
  onChange = console.log,
  showBottomMsg = false,
  emptyMsg = '还没有讨论',
  noMoreMsg = '没有更多讨论了',
  ...restProps
}) => {
  const { pagedPosts } = usePagedPosts()
  const { pageNumber, pageSize, totalCount, totalPages } = pagedPosts

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
