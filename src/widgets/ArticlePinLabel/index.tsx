/*
 *
 * ArticlePinLabel
 *
 */

import { type FC, memo } from 'react'

import usePrimaryColor from '@/hooks/usePrimaryColor'

import { PinIcon } from './styles'

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
