/*
 * ArticleReadLabel
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import { ReadedLabel } from './styles'

const _log = buildLog('w:ArticleReadLabel:index')

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

export default observer(ReadLabel)
