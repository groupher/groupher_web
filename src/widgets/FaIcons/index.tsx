/*
 *
 * FaIcons
 *
 */

import { FC, memo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

import type { TSpace, TColorName } from '@/spec'
import { buildLog } from '@/logger'
import { camelize } from '@/fmt'

import FaIcon from './icons'
import type { TIcon } from './spec'

import { Wrapper } from './styles'
import useThemeData from '@/hooks/useThemeData'

/* eslint-disable-next-line */
const log = buildLog('c:FaIcons:index')

export type TProps = {
  testid?: string
  size?: number
  icon?: TIcon
  color?: TColorName
  opacity?: number
} & TSpace

const FaIcons: FC<TProps> = ({
  testid = 'fa-icons',
  size = 16,
  icon = 'user',
  color = 'ORANGE',
  ...restProps
}) => {
  const themeData = useThemeData()

  return (
    <Wrapper $testid={testid} {...restProps}>
      <FontAwesomeIcon
        icon={FaIcon[icon]}
        fontSize={size}
        color={themeData.rainbow[camelize(color)]}
      />
    </Wrapper>
  )
}

export default memo(FaIcons)
