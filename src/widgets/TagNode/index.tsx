/*
 *
 * TagNode
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react'

import { buildLog } from '@/logger'
import useTagLayout from '@/hooks/useTagLayout'
import useTheme from '@/hooks/useTheme'

import { TAG_LAYOUT } from '@/constant/layout'
import { COLOR_NAME } from '@/constant/colors'
import THEME from '@/constant/theme'

import { Dot, HashIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:TagNode:index')

type TProps = {
  color?: string
  dotSize?: number
  dotRight?: number
  dotLeft?: number
  hashSize?: number
  hashRight?: number
  hashLeft?: number
  hashTop?: number
  opacity?: number
}

const TagNode: FC<TProps> = ({
  color = COLOR_NAME.BLACK,
  dotSize = 10,
  dotRight = 5,
  dotLeft = 0,
  hashSize = 15,
  hashRight = 5,
  hashLeft = 0,
  hashTop = 0,
  opacity = 1,
}) => {
  const tagLayout = useTagLayout()
  const { curTheme } = useTheme()
  const dividerBorder = curTheme === THEME.NIGHT

  return (
    <>
      {tagLayout === TAG_LAYOUT.DOT ? (
        <Dot
          color={color}
          size={dotSize}
          opacity={opacity}
          left={dotLeft}
          right={dotRight}
          dividerBorder={dividerBorder}
        />
      ) : (
        <HashIcon
          color={color}
          size={hashSize}
          opacity={opacity}
          top={hashTop}
          left={hashLeft}
          right={hashRight}
        />
      )}
    </>
  )
}

export default observer(TagNode)
