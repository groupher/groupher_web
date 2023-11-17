import styled from 'styled-components'

import css, { theme } from '@/css'

import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import RejectSVG from '@/icons/Reject'
import OtherSVG from '@/icons/menu/Feedback'

type TWrapper = {
  $smaller: boolean
}

export const Wrapper = styled.div<TWrapper>`
  color: ${theme('article.title')};
  ${css.row('align-center')};
  padding: 0 5px;
  line-height: ${({ $smaller }) => ($smaller ? '20px' : '32px')};
  font-size: 12px;
  opacity: 0.82;
`
export const IconWrapper = styled.div`
  ${css.size(16)};
  margin-right: 3px;
  ${css.row('align-both')};
`
export const LockWrapper = styled.div<{ $smaller: boolean }>`
  color: ${theme('article.info')};
  font-size: ${({ $smaller }) => ($smaller ? '12px' : '14px')};
  margin-right: ${({ $smaller }) => ($smaller ? '0' : '6px')};
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(13)};
    fill: ${theme('article.digest')};
  `
}

export const ICON = {
  REJECT: commonIcon(RejectSVG),
  FEATURE: commonIcon(LightSVG),
  BUG: styled(commonIcon(BugSVG))`
    ${css.size(14)};
  `,
  QUESTION: styled(commonIcon(QuestionSVG))`
    ${css.size(12)};
  `,
  OTHER: commonIcon(OtherSVG),
}
