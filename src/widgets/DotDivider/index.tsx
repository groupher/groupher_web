/*
 *
 * DotDivider
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'
import { Wrapper } from './styles'

const _log = buildLog('w:DotDivider:index')

export type TProps = {
  className?: string
  radius?: number
  space?: number
}
const DotDivider: FC<TProps> = ({ radius = 2, space = 3, className = 'dot-divider-class' }) => {
  return <Wrapper className={className} $radius={radius} $space={space} />
}

export default memo(DotDivider)
