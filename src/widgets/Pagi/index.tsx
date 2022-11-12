/*
 * Pagi
 */

import { FC, ReactNode } from 'react'

import type { TSpace } from '@/spec'
import RealPagi from './RealPagi'

export type TProps = {
  children?: ReactNode
  type?: 'bottom' | 'center'
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  margin?: TSpace
  emptyMsg?: string
  noMoreMsg?: string
  showBottomMsg?: boolean
  onChange?: (page: number) => void
}

const Pagi = RealPagi

export default Pagi as FC<TProps>
