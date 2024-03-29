import type { TActive, TColor, TSizeTS, TSpace } from '@/spec'
import SIZE from '@/constant/size'
import styled, { css, theme, rainbow } from '@/css'

import Button from '@/widgets/Buttons/Button'
import ArrowSVG from '@/icons/ArrowSimple'
import CloseSVG from '@/icons/CloseLight'

type TWrapper = { $withBorder: boolean; size: TSizeTS; selected: boolean } & TSpace &
  TActive &
  TColor

export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};

  border-radius: 10px;

  transform: ${({ size }) => (size === SIZE.TINY ? 'scale(0.85)' : 'none')};

  margin-top: ${({ top }) => `${top}px`};
  margin-bottom: ${({ bottom }) => `${bottom}px`};
  margin-left: ${({ left }) => `${left}px`};
  margin-right: ${({ right, $active, selected }) =>
    // @ts-ignore
    selected || $active ? `${right || 0}px` : `${right}px`};

  transition: all 0.2s;
`
type TInnerBtnWrapper = TActive & TColor
export const InnerBtnWrapper = styled.div<TInnerBtnWrapper>`
  ${css.row('align-center')};
  margin-left: 2px;
  font-weight: 400;
  font-size: 13px;

  &:hover {
    cursor: pointer;
  }

  transition: color 0.2s;
`
export const ButtonWrapper = styled(Button)`
  ${css.row('align-both')};
  border: none;
  padding-left: 3px;
  padding-right: 5px;
  /** make sure tooltip visible */
  overflow: visible;
  box-shadow: none;

  &::after {
    display: none;
  }
  &:hover,
  &:active,
  &:focus {
    filter: saturate(1) brightness(1);
  }
`
type TFilterIcon = Omit<TWrapper, '$withBorder' | 'size'>
export const FilterIcon = styled(ArrowSVG)<TFilterIcon>`
  fill: ${({ $active, selected, $color }) =>
    $active || selected ? rainbow($color, 'article.digest') : theme('article.digest')};
  ${css.size(14)};
  transform: rotate(-90deg);
  opacity: 0.8;

  ${InnerBtnWrapper}:hover & {
    fill: ${({ $active, $color }) =>
      $active ? rainbow($color, 'article.digest') : theme('article.digest')};
  }

  ${css.media.mobile`
    margin-left: 3px;
    opacity: 0.6;
  `};
`

export const CloseWrapper = styled.div`
  ${css.circle(16)};
  ${css.row('align-both')};

  &:hover {
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const CloseIcon = styled(CloseSVG)`
  fill: ${theme('hint')};
  ${css.size(13)};
  transform: rotate(0);

  ${CloseWrapper}:hover & {
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
