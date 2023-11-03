/*
 *
 * TagNode
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TColorName } from '@/spec'
import { buildLog } from '@/logger'
import useTagLayout from '@/hooks/useTagLayout'
import useTheme from '@/hooks/useTheme'

import { TAG_LAYOUT } from '@/constant/layout'
import { COLOR_NAME } from '@/constant/colors'
import THEME from '@/constant/theme'

import { Dot, HashBoldIcon, HashNormalIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:TagNode:index')

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
  const tagLayout = useTagLayout()
  const { curTheme } = useTheme()
  const darkTheme = curTheme === THEME.NIGHT

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

export default observer(TagNode)
