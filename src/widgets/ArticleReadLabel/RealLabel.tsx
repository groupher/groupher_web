/*
 * ArticleReadLabel
 */

import type { FC } from 'react'

import type { TSpace } from '@/spec'

import { ReadedLabel } from './styles'

export type TProps = {
  viewed?: boolean
  size?: number
  isLogin: boolean
} & TSpace

const ReadLabel: FC<TProps> = ({ isLogin, viewed, size = 8, ...restProps }) => {
  if (!isLogin) return null

  if (!viewed) {
    return <ReadedLabel size={size} {...restProps} />
  }

  return null
}

export default ReadLabel
