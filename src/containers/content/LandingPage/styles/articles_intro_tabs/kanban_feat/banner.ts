import styled from 'styled-components'

import { Bar as BarBase, WithPosition } from '@/widgets/Common'

import KanbenSVG from '@/icons/Kanban'
import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  flex-grow: 1;
`
export const InnerWrapper = styled.div`
  ${css.column()};
  width: 650px;
  height: 100%;
  padding-top: 24px;
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  font-weight: 500;
`
export const UsersWrapper = styled.div`
  filter: saturate(0.7);
  transform: scale(0.95);
`
export const Bar = styled(BarBase)`
  background: ${theme('hint')};
`
export const KanbenIcon = styled(KanbenSVG)`
  ${css.size(18)};
  transform: rotate(180deg);
  fill: ${theme('hint')};
  margin-left: -1px;
  margin-right: 2px;
  opacity: 0.8;
`
export const LabelBar = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
`
export const Item = styled(WithPosition)`
  ${css.row('align-center')};
`
export const Label = styled.div`
  fill: ${theme('hint')};
  font-size: 11px;
  margin-left: 5px;
`
export const Icon1 = styled(GtdTodoSVG)`
  ${css.size(12)};
  fill: ${theme('hint')};
  opacity: 0.6;
`
export const Icon2 = styled(GtdWipSVG)`
  ${css.size(12)};
  fill: ${theme('hint')};
  opacity: 0.8;
`
export const Icon3 = styled(GtdDoneSVG)`
  ${css.size(12)};
  fill: ${theme('hint')};
`
