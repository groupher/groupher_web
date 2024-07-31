import type { TActive, TColor, TSizeTS, TSpace } from '~/spec'
import SIZE from '~/const/size'
import styled, { css, theme, rainbow } from '~/css'

import Button from '~/widgets/Buttons/Button'
import ArrowSVG from '~/icons/ArrowSimple'
import CloseSVG from '~/icons/CloseLight'
import CategorySVG from '~/icons/Category'
import SortSVG from '~/icons/Sort'
import WipSVG from '~/icons/GtdWip'

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

  &:hover {
    cursor: pointer;
  }

  transition: color 0.2s;
`
/** TODO:  add a color in theme for hint, otherwire add opacity here will cause tooltip opacity too */
export const Main = styled.div`
  font-size: 14px;
  color: ${theme('text.digest')};
  font-weight: normal;
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

export const CategoryIcon = styled(CategorySVG)`
  // fill: ${theme('article.digest')};
  fill: ${theme('rainbow.purple')};
  ${css.size(14)};
  margin-right: 4px;
  opacity: 0.8;
`
export const SortIcon = styled(SortSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 4px;
`

export const WipIcon = styled(WipSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 4px;
  opacity: 0.8;

  transform: rotate(90deg);
`
