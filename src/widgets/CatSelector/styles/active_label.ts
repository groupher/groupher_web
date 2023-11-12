import styled from 'styled-components'

import type { TColor } from '@/spec'

import css, { theme, rainbow } from '@/css'

import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import OtherSVG from '@/icons/menu/Feedback'

export const Wrapper = styled.div<TColor>`
  ${css.row('align-center')};
  padding: 12px 0;
  border-radius: 8px;
`
export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  opacity: 0.8;
  margin-right: 5px;
`
export const LabelWrapper = styled.div`
  ${css.row('align-center')};
  padding: 5px 6px;
  border-radius: 8px;
  background: ${theme('hoverActive')};
  margin-left: 3px;
  box-shadow: ${theme('button.boxShadow')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  font-weight: 500;
`
const iconBase = `
  ${css.size(13)};
  margin-right: 5px;
`
export const LightIcon = styled(LightSVG)<TColor>`
  ${iconBase};
  margin-top: -2px;
  fill: ${({ $color }) => rainbow($color, 'article.digest')};
`
export const BugIcon = styled(BugSVG)<TColor>`
  ${iconBase};
  fill: ${({ $color }) => rainbow($color, 'article.digest')};
`
export const QuestionIcon = styled(QuestionSVG)<TColor>`
  ${iconBase};
  ${css.size(11)};
  margin-top: -1px;
  fill: ${({ $color }) => rainbow($color, 'article.digest')};
`
export const OtherIcon = styled(OtherSVG)<TColor>`
  ${iconBase};
  fill: ${({ $color }) => rainbow($color, 'article.digest')};
`
export const ICON = {
  FEATURE: LightIcon,
  BUG: BugIcon,
  QUESTION: QuestionIcon,
  OTHER: OtherIcon,
}
