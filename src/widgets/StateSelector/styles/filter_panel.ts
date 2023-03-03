import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { SelectItem as SelectItemBase } from '.'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'
import GtdRejectSVG from '@/icons/Reject'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 110px;
  padding: 8px 10px;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.flex('align-center')};
  padding: 7px 5px;
`
export const IconWrapper = styled.div`
  ${css.circle(16)};
  ${css.flex('align-both')};

  opacity: 0.6;
  margin-right: 9px;
`
export const TodoIcon = styled(GtdTodoSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
`
export const WipIcon = styled(GtdWipSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
`
export const DoneIcon = styled(GtdDoneSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
`
export const RejectIcon = styled(GtdRejectSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
`
export const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${theme('article.digest')};

  ${SelectItem}:hover & {
    color: ${theme('article.title')};
  }
`
