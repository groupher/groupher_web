import styled from 'styled-components'

import type { TActive, TPrimaryColor, TSizeTS, TSpace } from '@/spec'
import SIZE from '@/constant/size'
import css, { theme, primaryTheme, primaryLightTheme } from '@/css'

import Button from '@/widgets/Buttons/Button'
import ArrowSVG from '@/icons/ArrowSimple'

type TWrapper = { withBorder: boolean; size: TSizeTS; selected: boolean } & TSpace &
  TActive &
  TPrimaryColor

export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};

  /* border: ${({ withBorder, $active }) => (withBorder || $active ? '1px solid' : 'none')}; */
  border: 1px solid;
  border-color: ${({ withBorder, $active, selected, primaryColor }) =>
    withBorder || $active || selected ? primaryTheme(primaryColor, 'lightText') : 'transparent'};

  background: ${({ $active, selected, primaryColor }) =>
    $active || selected ? primaryLightTheme(primaryColor) : 'transparent'};

  border-radius: 10px;

  transform: ${({ size }) => (size === SIZE.TINY ? 'scale(0.85)' : 'none')};

  margin-top: ${({ top }) => `${top}px`};
  margin-bottom: ${({ bottom }) => `${bottom}px`};
  margin-left: ${({ left }) => `${left}px`};
  margin-right: ${({ right, $active, selected }) =>
    // @ts-ignore
    selected || $active ? `${(right || 0) + 10}px` : `${right}px`};

  &:hover {
    background: ${({ $active, primaryColor, selected }) =>
      $active || selected ? primaryLightTheme(primaryColor) : theme('hoverBg')};
  }

  transition: all 0.2s;
`
export const Label = styled.div`
  opacity: 0.7;
`
type TInnerBtnWrapper = TActive & TPrimaryColor
export const InnerBtnWrapper = styled.div<TInnerBtnWrapper>`
  ${css.row('align-center')};
  margin-left: 2px;
  color: ${({ $active, primaryColor }) =>
    $active ? primaryTheme(primaryColor) : theme('article.digest')};
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
type TFilterIcon = Omit<TWrapper, 'withBorder' | 'size'>
export const FilterIcon = styled(ArrowSVG)<TFilterIcon>`
  fill: ${({ $active, selected, primaryColor }) =>
    $active || selected ? primaryTheme(primaryColor, 'article.digest') : theme('article.digest')};
  ${css.size(14)};
  transform: rotate(-90deg);
  margin-left: 4px;

  ${InnerBtnWrapper}:hover & {
    fill: ${({ $active, primaryColor }) =>
      $active ? primaryTheme(primaryColor, 'article.digest') : theme('article.digest')};
  }

  ${css.media.mobile`
    margin-left: 3px;
    opacity: 0.6;
  `};
`
