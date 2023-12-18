/*
 * ArticleReadLabel
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'

import { ReadedLabel } from './styles'

const _log = buildLog('w:ArticleReadLabel:index')

export type TProps = {
  viewed?: boolean
  size?: number
} & TSpace

const ArticleReadLabel: FC<TProps> = ({ viewed, size = 8, ...restProps }) => {
  const { isLogin } = useAccount()

  if (!isLogin) return null

  if (!viewed) {
    return <ReadedLabel size={size} {...restProps} />
  }

  return null
}

export default observer(ArticleReadLabel)
