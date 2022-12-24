/*
 *
 * FaIcons
 *
 */

import { FC, memo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { COLORS } from '@/constant'
import type { TSpace, TColorName } from '@/spec'
import { buildLog } from '@/utils/logger'

import FaIcon from './icons'
import type { TIcon } from './spec'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:FaIcons:index')

export type TProps = {
  testid?: string
  size?: number
  icon?: TIcon
  color?: TColorName
} & TSpace

const FaIcons: FC<TProps> = ({
  testid = 'fa-icons',
  size = 16,
  icon = 'user',
  color = 'ORANGE',
  ...restProps
}) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      <FontAwesomeIcon icon={FaIcon[icon]} fontSize={size} color={COLORS[color]} />
    </Wrapper>
  )
}

export default memo(FaIcons)
