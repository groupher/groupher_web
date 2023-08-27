import styled from 'styled-components'

import css, { theme } from '@/css'

import LightSVG from '@/icons/Light'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/Bug'
import AllSVG from '@/icons/menu/Dots'
import OtherSVG from '@/icons/menu/Feedback'

import { SelectItem as SelectItemBase } from '.'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  min-width: 120px;
  margin-top: 2px;
  font-size: 14px;
  cursor: auto;
`
export const IconWrapper = styled.div`
  ${css.circle(16)};
  ${css.flex('align-both')};
  margin-right: 10px;
`

const iconBase = `
  ${css.size(14)};
  opacity: 0.8;
`
export const AllIcon = styled(AllSVG)`
  ${iconBase};
  ${css.size(16)};
  fill: ${theme('article.digest')};
`
export const LightIcon = styled(LightSVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
  margin-top: 1px;
`
export const QuestionIcon = styled(QuestionSVG)`
  ${iconBase};
  ${css.size(10)};
  fill: ${theme('article.digest')};
`
export const BugIcon = styled(BugSVG)`
  ${iconBase};
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const OtherIcon = styled(OtherSVG)`
  ${iconBase};
  ${css.size(13)};
  fill: ${theme('article.digest')};
`
export const SelectItem = styled(SelectItemBase)`
  ${css.flex('align-center')};
  padding: 7px 5px;
  border-radius: 5px;
`
export const Icon = {
  ALL: AllIcon,
  FEATURE: LightIcon,
  BUG: BugIcon,
  QUESTION: QuestionIcon,
  OTHER: OtherIcon,
}

export const Title = styled.div``
