import styled from 'styled-components'

import type { TActive, TColor, TSizeTS, TSpace } from '@/spec'
import SIZE from '@/constant/size'
import css, { theme, rainbow, rainbowLight } from '@/css'

import Button from '@/widgets/Buttons/Button'
import ArrowSVG from '@/icons/ArrowSimple'
import CloseSVG from '@/icons/CloseCross'

type TWrapper = { $withBorder: boolean; size: TSizeTS; selected: boolean } & TSpace &
  TActive &
  TColor

export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};

  border: 1px solid;
  border-color: ${({ $withBorder, $active, selected, $color }) =>
    $withBorder || $active || selected ? rainbow($color, 'lightText') : 'transparent'};

  background: ${({ $active, selected, $color }) =>
    $active || selected ? rainbowLight($color) : 'transparent'};

  border-radius: 10px;

  transform: ${({ size }) => (size === SIZE.TINY ? 'scale(0.85)' : 'none')};

  margin-top: ${({ top }) => `${top}px`};
  margin-bottom: ${({ bottom }) => `${bottom}px`};
  margin-left: ${({ left }) => `${left}px`};
  margin-right: ${({ right, $active, selected }) =>
    // @ts-ignore
    selected || $active ? `${(right || 0) + 10}px` : `${right}px`};

  &:hover {
    background: ${({ $active, $color, selected }) =>
      $active || selected ? rainbowLight($color) : theme('hoverBg')};
  }

  transition: all 0.2s;
`
export const Label = styled.div`
  opacity: 0.7;
`
type TInnerBtnWrapper = TActive & TColor
export const InnerBtnWrapper = styled.div<TInnerBtnWrapper>`
  ${css.row('align-center')};
  margin-left: 2px;
  color: ${({ $active, $color }) => ($active ? rainbow($color) : theme('article.digest'))};
  font-weight: 400;
  font-size: 13px;

  &:hover {
    cursor: pointer;
  }

  transition: color 0.2s;
`
export const ButtonWrapper = styled(Button)`
  border: none !important;
  padding-left: 6px;
  padding-right: 4px;
`
type TFilterIcon = Omit<TWrapper, '$withBorder' | 'size'>
export const FilterIcon = styled(ArrowSVG)<TFilterIcon>`
  fill: ${({ $active, selected, $color }) =>
    $active || selected ? rainbow($color, 'article.digest') : theme('article.digest')};
  ${css.size(14)};
  transform: rotate(-90deg);
  margin-left: 4px;

  ${InnerBtnWrapper}:hover & {
    fill: ${({ $active, $color }) =>
      $active ? rainbow($color, 'article.digest') : theme('article.digest')};
  }

  ${css.media.mobile`
    margin-left: 3px;
    opacity: 0.6;
  `};
`

export const CloseWrapper = styled.div<TColor>`
  ${css.circle(16)};
  ${css.row('align-both')};
  margin-left: 4px;

  color: ${({ $color }) => rainbow($color)};

  &:hover {
    color: ${theme('button.fg')};
    background: ${({ $color }) => rainbow($color)};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const CloseIcon = styled(CloseSVG)<TColor>`
  fill: ${({ $color }) => rainbow($color)};
  ${css.size(12)};
  transform: rotate(-90deg);
  opacity: 0.8;

  ${CloseWrapper}:hover & {
    fill: ${theme('button.fg')};
    opacity: 1;
  }
  transition: all 0.2s;
`
