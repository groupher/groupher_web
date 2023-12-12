import styled, { css, theme, rainbowLight, rainbow } from '@/css'
import type { TColor, TColorName } from '@/spec'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'
import AddSVG from '@/icons/Add'

export const Column = styled.div`
  ${css.column('align-start')};
  width: 32%;
  min-width: 32%;
  min-height: 70vh;
  /* border: 1px solid; */
  /* border-color: ${theme('article.info')}; */
`
export const Header = styled.div`
  ${css.row('align-center')};
  padding-bottom: 15px;
  width: 100%;
  padding-left: 3px;
`
export const Body = styled.div<{ color: TColorName }>`
  background-color: ${({ color }) => rainbowLight(color)};
  padding: 8px;
  padding-bottom: 0;
  border-radius: 12px;
  width: 100%;
`
export const SubTitle = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
  margin-left: 6px;
`
export const Label = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 600;
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
