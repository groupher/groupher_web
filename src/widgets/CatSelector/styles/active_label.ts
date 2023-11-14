import styled from 'styled-components'

import css, { theme } from '@/css'

import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import OtherSVG from '@/icons/menu/Feedback'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  transform: scale(0.92);
`
export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-right: 5px;
`
export const LabelWrapper = styled.div`
  ${css.row('align-center')};
  padding: 5px 6px;
  border-radius: 8px;
  background: ${theme('hoverActive')};
  margin-left: 3px;
  box-shadow: ${theme('button.boxShadow')};
  height: 26px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  font-weight: 500;

  ${Wrapper}:hover & {
    opacity: 0.8;
  }
`
const iconBase = `
  ${css.size(13)};
  margin-right: 5px;
`
export const LightIcon = styled(LightSVG)`
  ${iconBase};
`
export const BugIcon = styled(BugSVG)`
  ${iconBase};
`
export const QuestionIcon = styled(QuestionSVG)`
  ${iconBase};
  ${css.size(11)};
  margin-top: -1px;
  fill: ${theme('article.digest')};
`
export const OtherIcon = styled(OtherSVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
`
export const ICON = {
  FEATURE: LightIcon,
  BUG: BugIcon,
  QUESTION: QuestionIcon,
  OTHER: OtherIcon,
}
