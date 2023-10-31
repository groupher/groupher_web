/*
 * ArticleReadLabel
 */

import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'

import { ReadedLabel } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:ArticleReadLabel:index')

export type TProps = {
  article: {
    viewerHasViewed?: boolean
    isPinned?: boolean
  }
  size?: number
} & TSpace

const ArticleReadLabel: FC<TProps> = ({ article, size = 8, ...restProps }) => {
  const accountInfo = useAccount()
  const { viewerHasViewed } = article

  if (!accountInfo.isLogin) return null

  // return <ReadedLabel top={top} left={left} />
  if (!viewerHasViewed) {
    return <ReadedLabel size={size} {...restProps} />
  }

  return null
}

export default observer(ArticleReadLabel)
