/*
 *
 * TagNode
 *
 */

import type { FC } from 'react'

import type { TColorName } from '~/spec'
import useLayout from '~/hooks/useLayout'
// import useTheme from '~/hooks/useTheme'

import { TAG_LAYOUT } from '~/const/layout'
import { COLOR_NAME } from '~/const/colors'
// import THEME from '~/const/theme'

import HashSVG from '~/icons/HashTag'
import HashSVGBold from '~/icons/HashTagBold'

import useSalon from './styles'

export type TProps = {
  color?: TColorName
  dotSize?: number
  dotRight?: number
  dotLeft?: number
  dotTop?: number
  hashSize?: number
  hashRight?: number
  hashLeft?: number
  hashTop?: number
  boldHash?: boolean
}

const TagNode: FC<TProps> = ({ color = COLOR_NAME.BLACK, boldHash = false, ...restProps }) => {
  const s = useSalon({ color, ...restProps })

  const { tagLayout } = useLayout()
  // const { theme } = useTheme()
  // const darkTheme = theme === THEME.DARK

  const HashIcon = boldHash ? HashSVGBold : HashSVG

  return (
    <>
      {tagLayout === TAG_LAYOUT.DOT ? <div className={s.dot} /> : <HashIcon className={s.hash} />}
    </>
  )
}

export default TagNode
