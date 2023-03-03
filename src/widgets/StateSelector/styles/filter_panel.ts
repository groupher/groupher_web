import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { SelectItem as SelectItemBase } from '.'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'
import GtdRejectSVG from '@/icons/Reject'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 100px;
  gap: 5px 0;
  padding: 8px 6px;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.flex('align-center')};
`
export const TodoIcon = styled(GtdTodoSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  opacity: 0.5;
  margin-left: -1px;
  margin-right: 9px;
`
export const WipIcon = styled(GtdWipSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  opacity: 0.6;
  margin-left: -2px;
  margin-right: 8px;
`
export const DoneIcon = styled(GtdDoneSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  opacity: 0.4;
  margin-right: 8px;
`
export const RejectIcon = styled(GtdRejectSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
  opacity: 0.4;
  margin-right: 9px;
  margin-left: 1px;
  opacity: 0.5;

  ${SelectItem}:hover & {
    fill: ${theme('baseColor.red')};
    opacity: 1;
  }
`

export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};

  ${SelectItem}:hover & {
    color: ${theme('article.title')};
  }
`
