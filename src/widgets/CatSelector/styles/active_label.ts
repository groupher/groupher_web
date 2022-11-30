import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import LightSVG from '@/icons/Light'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/Bug'
import OtherSVG from '@/icons/menu/Feedback'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-weight: 600;

  /* background: linear-gradient(180deg, transparent 66%, #e8f0fe 0);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px; */
`
const iconBase = `
  ${css.size(14)};
  margin-right: 5px;
`

export const LightIcon = styled(LightSVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
`

export const BugIcon = styled(BugSVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
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

export const Icon = {
  FEATURE: LightIcon,
  BUG: BugIcon,
  QUESTION: QuestionIcon,
  OTHER: OtherIcon,
}
