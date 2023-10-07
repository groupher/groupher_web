/*
 * ArticleReadLabel
 */

import { FC } from 'react'
import { observer } from 'mobx-react'

import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'

import { ReadedLabel } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:ArticleReadLabel:index')

export type TProps = {
  top?: number
  left?: number
  article: {
    viewerHasViewed?: boolean
    isPinned?: boolean
  }
}
const ArticleReadLabel: FC<TProps> = ({ article, top = 24, left = -30 }) => {
  const accountInfo = useAccount()
  const { isPinned, viewerHasViewed } = article

  if (!accountInfo.isLogin || isPinned) return null

  const { markViewed } = accountInfo.customization

  // return <ReadedLabel top={top} left={left} />
  if (markViewed && !viewerHasViewed) {
    return <ReadedLabel top={top} left={left} />
  }

  return null
}

export default observer(ArticleReadLabel)
