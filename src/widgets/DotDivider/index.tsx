/*
 *
 * DotDivider
 *
 */

import { type FC, memo } from 'react'

import { Wrapper } from './styles'

export type TProps = {
  className?: string
  radius?: number
  space?: number
}
const DotDivider: FC<TProps> = ({ radius = 2, space = 3, className = 'dot-divider-class' }) => {
  return <Wrapper className={className} $radius={radius} $space={space} />
}

export default memo(DotDivider)
