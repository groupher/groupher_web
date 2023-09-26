import styled from 'styled-components'

import type { TPrimaryColor } from '@/spec'

import css, { primaryTheme } from '@/css'

import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import OtherSVG from '@/icons/menu/Feedback'

export const Wrapper = styled.div<TPrimaryColor>`
  ${css.row('align-center')};
  color: ${({ primaryColor }) => primaryTheme(primaryColor)};
`
export const Title = styled.div`
  font-size: 13px;
  font-weight: 550;
`
const iconBase = `
  ${css.size(13)};
  margin-right: 5px;
`

export const LightIcon = styled(LightSVG)<TPrimaryColor>`
  ${iconBase};
  fill: ${({ primaryColor }) => primaryTheme(primaryColor, 'article.digest')};
`
export const BugIcon = styled(BugSVG)<TPrimaryColor>`
  ${iconBase};
  fill: ${({ primaryColor }) => primaryTheme(primaryColor, 'article.digest')};
`
export const QuestionIcon = styled(QuestionSVG)<TPrimaryColor>`
  ${iconBase};
  ${css.size(11)};
  margin-top: -1px;
  fill: ${({ primaryColor }) => primaryTheme(primaryColor, 'article.digest')};
`
export const OtherIcon = styled(OtherSVG)<TPrimaryColor>`
  ${iconBase};
  fill: ${({ primaryColor }) => primaryTheme(primaryColor, 'article.digest')};
`
export const ICON = {
  FEATURE: LightIcon,
  BUG: BugIcon,
  QUESTION: QuestionIcon,
  OTHER: OtherIcon,
}
