import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'
import { GRADIENT_DIRECTION } from '@/constant/wallpaper'

import css, { theme, rainbow } from '@/css'
import ArrowSVG from '@/icons/ArrowSolid'

const metric = {
  [GRADIENT_DIRECTION.TOP]: {
    rotate: '90deg',
  },
  [GRADIENT_DIRECTION.TOP_LEFT]: {
    rotate: '40deg',
  },
  [GRADIENT_DIRECTION.TOP_RIGHT]: {
    rotate: '140deg',
  },
  [GRADIENT_DIRECTION.BOTTOM]: {
    rotate: '270deg',
  },
  [GRADIENT_DIRECTION.BOTTOM_LEFT]: {
    rotate: '315deg',
  },
  [GRADIENT_DIRECTION.BOTTOM_RIGHT]: {
    rotate: '225deg',
  },
  [GRADIENT_DIRECTION.LEFT]: {
    rotate: '0deg',
  },
  [GRADIENT_DIRECTION.RIGHT]: {
    rotate: '180deg',
  },
}

export const Wrapper = styled.div`
  ${css.circle(68)};
  border: 1px solid;
  border-color: ${theme('divider')};
  position: relative;
  margin-top: 26px;
`
export const NeedleDot = styled.div`
  ${css.circle(4)};
  background: ${theme('article.title')};
  position: absolute;
  left: 30px;
  top: 29px;
`
export const Needle = styled.div<{ direction: string }>`
  position: absolute;
  top: 30px;
  left: 2px;

  width: 30px;
  height: 1px;
  background: ${theme('article.title')};

  transform: ${({ direction }) => `rotate(${metric[direction].rotate}) `};
  transform-origin: right;
`
type TPoint = TActive & TPrimaryColor
const Point = styled.div<TPoint>`
  position: absolute;
  font-size: 8px;
  ${css.circle(16)};
  ${css.row('align-both')};
  z-index: 2;

  font-weight: ${({ $active }) => ($active ? 600 : 'bormal')};
  background: ${({ $active, primaryColor }) =>
    $active ? rainbow(primaryColor) : theme('divider')};
  color: ${({ $active }) => (!$active ? theme('article.title') : 'white')};
  border: 1px solid transparent;

  &:hover {
    border-color: ${theme('article.digest')};
    border-color: ${({ primaryColor }) => rainbow(primaryColor)};
    font-weight: 600;
    cursor: pointer;
    color: white;
  }

  transition: all 0.2s;
`

const SidePoint = styled(Point)`
  ${css.circle(10)};
  ${css.row('align-both')};

  opacity: ${({ $active }) => ($active ? 1 : 0.4)};

  ${Wrapper}:hover & {
    opacity: 1;
  }
`

type TArrowIcon = { deg: string } & TActive
export const ArrowIcon = styled(ArrowSVG)<TArrowIcon>`
  ${css.size(13)};
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
  transform: ${({ deg }) => `rotate(${deg})`};
`

export const Top = styled(Point)`
  top: -8px;
  left: 24px;
  padding-bottom: 1px;
`
export const TopLeft = styled(SidePoint)`
  top: 5px;
  left: 2px;
  padding-bottom: 1px;
  padding-right: 1px;
`
export const TopRight = styled(SidePoint)`
  top: 5px;
  left: 52px;
  padding-bottom: 1px;
  padding-left: 1px;
`
export const Right = styled(Point)`
  top: 24px;
  right: -8px;
  padding-left: 3px;
`
export const Bottom = styled(Point)`
  bottom: -8px;
  left: 24px;
  padding-top: 1px;
`
export const BottomLeft = styled(SidePoint)`
  bottom: 6px;
  left: 2px;
  padding-top: 1px;
  padding-right: 1px;
`
export const BottomRight = styled(SidePoint)`
  bottom: 6px;
  left: 52px;
  padding-top: 1px;
  padding-left: 1px;
`
export const Left = styled(Point)`
  top: 23px;
  left: -8px;
  padding-right: 3px;
`
