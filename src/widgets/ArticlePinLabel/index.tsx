/*
 *
 * ArticlePinLabel
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { PinIcon } from './styles'

const _log = buildLog('w:ArticlePinLabel:index')

export type TProps = {
  top?: number
  left?: number
  isPinned?: boolean
}
const ArticlePinLabel: FC<TProps> = ({ isPinned, top = 24, left = -30 }) => {
  const primaryColor = usePrimaryColor()

  if (isPinned) return <PinIcon top={top} left={left} $color={primaryColor} />

  return null
}

export default memo(ArticlePinLabel)
