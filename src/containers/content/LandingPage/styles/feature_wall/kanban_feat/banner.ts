import styled from 'styled-components'

import { Bar as BarBase } from '@/widgets/Common'

import KanbenSVG from '@/icons/Kanban'
import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'

import css from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  flex-grow: 1;
  width: 100%;
  padding: 15px 32px;
  position: relative;
`
export const Header = styled.div`
  ${css.flex('align-center')};
`
export const Bar = styled(BarBase)`
  background: #c3d6f3;
`

export const KanbenIcon = styled(KanbenSVG)`
  ${css.size(18)};
  transform: rotate(180deg);
  fill: #5d9dfb;
  opacity: 0.5;
`

export const Item = styled.div<{ left: number }>`
  ${css.flex('align-center')};
  position: absolute;
  bottom: 8px;
  left: ${({ left }) => `${left}px`};
`

export const Title = styled.div`
  color: #5d9dfb;
  font-size: 11px;
  margin-left: 5px;
`

export const Icon1 = styled(GtdTodoSVG)`
  ${css.size(12)};
  fill: #5799fb;
  opacity: 0.6;
`
export const Icon2 = styled(GtdWipSVG)`
  ${css.size(12)};
  fill: #5799fb;
  opacity: 0.8;
`
export const Icon3 = styled(GtdDoneSVG)`
  ${css.size(12)};
  fill: #69b8cc;
`
