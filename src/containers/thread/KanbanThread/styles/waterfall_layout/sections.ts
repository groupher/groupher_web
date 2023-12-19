import styled, { css, theme, rainbow, rainbowSoft } from '@/css'
import type { TColor } from '@/spec'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'
import AddSVG from '@/icons/Add'

export const Wrapper = styled.div`
  ${css.column('align-start')};
  width: 100%;
  gap: 40px 0;
  min-height: 500px;
`
export const Column = styled.div`
  ${css.column('align-start')};
  width: 100%;
  min-height: 10vh;
`
export const Header = styled.div<TColor>`
  ${css.row('align-center')};
  background: ${({ $color }) => rainbowSoft($color)};
  height: 42px;
  padding: 0 20px;
  border-radius: 20px;
  width: 100%;
  filter: saturate(0.85);
`
export const Body = styled.div`
  padding: 8px;
  padding-bottom: 0;
  border-radius: 12px;
  width: 100%;
`
export const SubTitle = styled.div<TColor>`
  color: ${({ $color }) => rainbow($color)};
  font-size: 12px;
  margin-top: 3px;
  margin-left: 10px;
  filter: saturate(0.2);
`
export const Label = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
`
export const TODOIcon = styled(GtdTodoSVG)<TColor>`
  ${css.size(12)};
  fill: ${({ $color }) => rainbow($color)};
`
export const WipIcon = styled(GtdWipSVG)<TColor>`
  ${css.size(15)};
  fill: ${({ $color }) => rainbow($color)};
`
export const DoneIcon = styled(GtdDoneSVG)<TColor>`
  ${css.size(12)};
  fill: ${({ $color }) => rainbow($color)};
`

export const AddIcon = styled(AddSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
`
