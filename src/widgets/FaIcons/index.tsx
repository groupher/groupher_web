/*
 *
 * FaIcons
 *
 */

import { FC, memo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { COLORS } from '@/constant'
import type { TColorName } from '@/spec'
import { buildLog } from '@/utils/logger'

import FaIcon from './icons'
import type { TIcon } from './spec'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:FaIcons:index')

type TProps = {
  testid?: string
  size?: number
  icon?: TIcon
  color?: TColorName
}

const FaIcons: FC<TProps> = ({
  testid = 'fa-icons',
  size = 16,
  icon = 'user',
  color = 'ORANGE',
}) => {
  return (
    <Wrapper testid={testid}>
      <FontAwesomeIcon icon={FaIcon[icon]} fontSize={size} color={COLORS[color]} />
    </Wrapper>
  )
}

export default memo(FaIcons)
