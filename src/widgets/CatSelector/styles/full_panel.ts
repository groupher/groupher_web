import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import LightSVG from '@/icons/Light'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/Bug'
import AllSVG from '@/icons/menu/MoreL'
import OtherSVG from '@/icons/menu/Feedback'

export { SelectItem } from '.'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  min-width: 190px;
`
const iconBase = `
  ${css.size(18)};
  margin-right: 12px;
  opacity: 0.8;
  margin-top: 5px;
`
export const AllIcon = styled(AllSVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
`
export const LightIcon = styled(LightSVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
`
export const QuestionIcon = styled(QuestionSVG)`
  ${iconBase};
  ${css.size(14)};
  margin-right: 13px;
  margin-left: 1px;
  fill: ${theme('article.digest')};
`
export const BugIcon = styled(BugSVG)`
  ${iconBase};
  ${css.size(16)};
  margin-left: 1px;
  fill: ${theme('article.digest')};
`
export const OtherIcon = styled(OtherSVG)`
  ${iconBase};
  margin-left: 1px;
  margin-right: 10px;
  fill: ${theme('article.digest')};
`

export const Icon = {
  FEATURE: LightIcon,
  BUG: BugIcon,
  QUESTION: QuestionIcon,
  OTHER: OtherIcon,
}

export const RightPart = styled.div``
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: 500;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.8;
`
