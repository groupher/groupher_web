/*
 *
 * TagNode
 *
 */

import type { FC } from 'react'

import type { TColorName } from '@/spec'
import useLayout from '@/hooks/useLayout'
import useTheme from '@/hooks/useTheme'

import { TAG_LAYOUT } from '@/const/layout'
import { COLOR_NAME } from '@/const/colors'
import THEME from '@/const/theme'

import { Dot, HashBoldIcon, HashNormalIcon } from './styles'

type TProps = {
  color?: string
  dotSize?: number
  dotRight?: number
  dotLeft?: number
  dotTop?: number
  hashSize?: number
  hashRight?: number
  hashLeft?: number
  hashTop?: number
  opacity?: number
  boldHash?: boolean
}

const TagNode: FC<TProps> = ({
  color = COLOR_NAME.BLACK,
  dotSize = 10,
  dotRight = 5,
  dotTop = 0,
  dotLeft = 0,
  hashSize = 15,
  hashRight = 5,
  hashLeft = 0,
  hashTop = 0,
  opacity = 1,
  boldHash = false,
}) => {
  const { tagLayout } = useLayout()
  const { theme } = useTheme()
  const darkTheme = theme === THEME.NIGHT

  const HashIcon = boldHash ? HashBoldIcon : HashNormalIcon

  return (
    <>
      {tagLayout === TAG_LAYOUT.DOT ? (
        <Dot
          $color={color as TColorName}
          size={dotSize}
          opacity={opacity}
          top={dotTop}
          left={dotLeft}
          right={dotRight}
        />
      ) : (
        <HashIcon
          $color={color as TColorName}
          size={hashSize}
          opacity={opacity}
          top={hashTop}
          left={hashLeft}
          right={hashRight}
          $darkTheme={darkTheme}
        />
      )}
    </>
  )
}

export default TagNode
