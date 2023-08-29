/*
 *
 * ArrowButtons
 *
 */

import { FC, ReactNode, memo, useRef, useEffect, useState } from 'react'

import type { TColorName, TSpace } from '@/spec'

import { COLOR_NAME } from '@/constant/colors'

import { buildLog } from '@/utils/logger'

import Arrow from './Arrow'
import { Wrapper, Text } from '../styles/arrow_button'

/* eslint-disable-next-line */
const log = buildLog('w:Buttons:ArrowButton')

export type TProps = {
  children?: ReactNode
  onClick?: () => void
  dimWhenIdle?: boolean
  disabled?: boolean
  color?: TColorName
  reverseColor?: boolean
  className?: string
  leftLayout?: boolean
  up?: boolean
  down?: boolean
  fontSize?: number
  initWidth?: number
} & TSpace

const ArrowButton: FC<TProps> = ({
  children = '下一步',
  onClick = log,
  dimWhenIdle = false,
  disabled = false,
  color = COLOR_NAME.BLACK,
  className = '',
  leftLayout = false,
  reverseColor = false,
  up = false,
  down = false,
  fontSize = 13,
  initWidth = 55,
  ...restProps
}) => {
  const ref = useRef()
  const [width, setWidth] = useState(initWidth)

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      setWidth(ref.current.offsetWidth)
    }
  }, [ref])

  return (
    <Wrapper
      width={width}
      className={className}
      onClick={() => !disabled && onClick()}
      dimWhenIdle={dimWhenIdle}
      disabled={disabled}
      color={color}
      reverseColor={reverseColor}
      fontSize={fontSize}
      {...restProps}
    >
      {leftLayout && (
        <Arrow
          color={color}
          reverseColor={reverseColor}
          leftLayout={leftLayout}
          up={up}
          down={down}
        />
      )}
      <Text ref={ref} fontSize={fontSize}>
        {children}
      </Text>
      {!leftLayout && (
        <Arrow
          color={color}
          reverseColor={reverseColor}
          leftLayout={leftLayout}
          up={up}
          down={down}
        />
      )}
    </Wrapper>
  )
}

export default memo(ArrowButton)
