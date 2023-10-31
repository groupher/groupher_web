/*
 *
 * ArticlePinLabel
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { PinIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlePinLabel:index')

export type TProps = {
  top?: number
  left?: number
  article: {
    isPinned?: boolean
  }
}
const ArticlePinLabel: FC<TProps> = ({ article, top = 24, left = -30 }) => {
  const primaryColor = usePrimaryColor()

  if (article.isPinned) return <PinIcon top={top} left={left} $color={primaryColor} />

  return null
}

export default memo(ArticlePinLabel)
