import styled from 'styled-components'

import type { TColor } from '@/spec'

import css, { rainbow } from '@/css'

import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import OtherSVG from '@/icons/menu/Feedback'

export const Wrapper = styled.div<TColor>`
  ${css.row('align-center')};
  color: ${({ $color }) => rainbow($color)};
`
export const Title = styled.div`
  font-size: 13px;
  font-weight: 550;
`
const iconBase = `
  ${css.size(13)};
  margin-right: 5px;
`

export const LightIcon = styled(LightSVG)<TColor>`
  ${iconBase};
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
