import styled from 'styled-components'

import css, { theme, rainbowTheme } from '@/css'
import type { TActive, TPrimaryColor } from '@/spec'

import { SelectItem as SelectItemBase } from '.'

import AllSVG from '@/icons/menu/Dots'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'
import GtdRejectSVG from '@/icons/Reject'

export const Wrapper = styled.div`
  ${css.column()};
  width: 110px;
  padding: 8px 10px;
  cursor: auto;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.row('align-center')};
  padding: 7px 5px;
`
export const IconWrapper = styled.div`
  ${css.circle(16)};
  ${css.row('align-both')};

  opacity: 0.6;
  margin-right: 9px;
`

type TIcon = TActive & TPrimaryColor
export const AllIcon = styled(AllSVG)<TIcon>`
  ${css.size(14)};
  fill: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};
`
export const TodoIcon = styled(GtdTodoSVG)<TIcon>`
  ${css.size(14)};
  fill: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};
`
export const WipIcon = styled(GtdWipSVG)<TIcon>`
  ${css.size(16)};
  fill: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};
`
export const DoneIcon = styled(GtdDoneSVG)<TIcon>`
  ${css.size(14)};
  fill: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};
`
export const RejectIcon = styled(GtdRejectSVG)<TIcon>`
  ${css.size(13)};
  fill: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};
`

type TTitle = TPrimaryColor & TActive
export const Title = styled.div<TTitle>`
  font-size: 14px;

  color: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  /* ${SelectItem}:hover & {
    color: ${({ $active, primaryColor }) =>
    $active ? rainbowTheme(primaryColor) : theme('article.digest')};
  } */

  &:hover {
    color: ${({ $active, primaryColor }) =>
      $active ? rainbowTheme(primaryColor) : theme('article.digest')};
  }
`
