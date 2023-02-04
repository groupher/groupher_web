/*
 *
 * ArrowButtons
 *
 */

import { FC, ReactNode, memo } from 'react'

import type { TColorName, TSize, TSpace } from '@/spec'
import SIZE from '@/constant/size'

import { COLOR_NAME } from '@/constant/colors'

import { buildLog } from '@/utils/logger'

import Arrow from './Arrow'
import { Wrapper } from '../styles/arrow_button'

/* eslint-disable-next-line */
const log = buildLog('w:Buttons:ArrowButton')

type TProps = {
  children?: ReactNode
  onClick?: () => void
  dimWhenIdle?: boolean
  disabled?: boolean
  color?: TColorName
  linkColor?: boolean
  className?: string
  leftLayout?: boolean
  size?: TSize
} & TSpace

const ArrowButton: FC<TProps> = ({
  children = '下一步',
  onClick = log,
  dimWhenIdle = false,
  disabled = false,
  color = COLOR_NAME.BLACK,
  className = '',
  leftLayout = false,
  linkColor = false,
  size = SIZE.MEDIUM,
  ...restProps
}) => {
  return (
    <Wrapper
      className={className}
      onClick={() => !disabled && onClick()}
      dimWhenIdle={dimWhenIdle}
      disabled={disabled}
      color={color}
      linkColor={linkColor}
      size={size}
      {...restProps}
    >
      {leftLayout && <Arrow color={color} linkColor={linkColor} leftLayout={leftLayout} />}
      {children}
      {!leftLayout && <Arrow color={color} linkColor={linkColor} leftLayout={leftLayout} />}
    </Wrapper>
  )
}

export default memo(ArrowButton)
