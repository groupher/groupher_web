import styled from 'styled-components'

import css, { theme } from '@/css'

import ToolSVG from '@/icons/Tool'
import SadSVG from '@/icons/SadFace'
import PlaneSVG from '@/icons/Plane'

export const Wrapper = styled.div<{ grey: boolean }>`
  ${css.flex('align-center')};
  position: relative;
  border: 1px solid;
  border-bottom: 3px solid;
  border-color: ${theme('divider')};
  border-radius: 12px;
  width: auto;
  padding: 5px 10px;
  background-color: ${({ grey }) => (grey ? theme('hoverBg') : theme('alphaBg'))};
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
export const Building = styled.span`
  font-size: 12px;
  filter: saturate(0.8);
  opacity: 0.65;
`
export const ToolIcon = styled(ToolSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: 1px;
  opacity: 0.7;
`
export const SadIcon = styled(SadSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  margin-left: 1px;
`
export const InternetIcon = styled(PlaneSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
  margin-left: 1px;
  margin-right: 1px;
`
export const Dot = styled.div`
  ${css.circle(6)};
  position: absolute;
  left: -3px;
  top: 14px;
  z-index: 2;
  background: ${theme('article.digest')};
  opacity: 0.6;
`
export const Text = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 6px;
`
