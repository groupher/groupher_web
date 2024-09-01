/*
 *
 * ArrowButtons
 *
 */

import { type FC, type ReactNode, useRef, useEffect, useState } from 'react'

import type { TColorName, TSpace } from '~/spec'

import usePrimaryColor from '~/hooks/usePrimaryColor'

import Arrow from './Arrow'
import { Wrapper, Text } from '../salon/arrow_button'

export type TProps = {
  children?: ReactNode
  onClick?: () => void
  dimWhenIdle?: boolean
  disabled?: boolean
  color?: TColorName | null
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
  onClick = console.log,
  dimWhenIdle = false,
  disabled = false,
  color = null,
  className = '',
  leftLayout = false,
  reverseColor = false,
  up = false,
  down = false,
  fontSize = 13,
  initWidth = 55,
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()
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
      $dimWhenIdle={dimWhenIdle}
      disabled={disabled}
      color={color || primaryColor}
      $reverseColor={reverseColor}
      fontSize={fontSize}
      {...restProps}
    >
      {leftLayout && (
        <Arrow
          color={color || primaryColor}
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
          color={color || primaryColor}
          reverseColor={reverseColor}
          leftLayout={leftLayout}
          up={up}
          down={down}
        />
      )}
    </Wrapper>
  )
}

export default ArrowButton
