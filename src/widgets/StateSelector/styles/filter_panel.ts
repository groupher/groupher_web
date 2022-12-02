import styled from 'styled-components'

import { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

import { SelectItem as SelectItemBase } from '.'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'
import GtdRejectSVG from '@/icons/Reject'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 130px;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.flex('align-center')};
  margin-bottom: 6px;
  margin-right: 3px;
`
export const TodoIcon = styled(GtdTodoSVG)`
  ${css.size(16)};
  fill: ${theme('baseColor.orange')};
  opacity: 0.7;
  margin-left: -2px;
  margin-right: 8px;
`
export const WipIcon = styled(GtdWipSVG)`
  ${css.size(16)};
  fill: ${theme('baseColor.blue')};
  margin-left: -2px;
  margin-right: 8px;
`
export const DoneIcon = styled(GtdDoneSVG)`
  ${css.size(14)};
  fill: ${theme('baseColor.green')};
  margin-right: 8px;
`
export const RejectIcon = styled(GtdRejectSVG)`
  ${css.size(13)};
  fill: ${theme('article.title')};
  margin-right: 8px;
  margin-top: -1px;
  margin-left: 1px;
  opacity: 0.5;

  ${SelectItem}:hover & {
    fill: ${theme('baseColor.red')};
    opacity: 1;
  }
`

export const RejectSection = styled.div``

export const RejectIndexIcon = styled(RejectIcon)`
  fill: ${theme('baseColor.red')};
  opacity: 1;

  ${RejectSection}:hover & {
    fill: ${theme('article.info')};
    display: none;
  }
  transition: all 0.3s;
`

export const RejectGroup = styled.div`
  ${css.flex()};
  flex-wrap: wrap;
  display: none;

  ${RejectSection}:hover & {
    display: block;
  }
`

export const GroupTitle = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.6;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-top: 3px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};

  ${SelectItem}:hover & {
    color: ${theme('article.title')};
  }
`

export const RejectSelectItem = styled(SelectItem)`
  &:hover {
    background: transparent;
    cursor: auto;
  }
  cursor: auto;
`

export const RejectTitle = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};

  ${RejectSection}:hover & {
    opacity: 0.6;
  }
`

export const By = styled.div`
  display: none;
  color: ${theme('article.digest')};
  font-size: 13px;

  ${RejectSection}:hover & {
    display: block;
    opacity: 0.6;
  }
`
