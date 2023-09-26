import styled from 'styled-components'

import type { TArticleState } from '@/spec'

import css, { theme } from '@/css'

import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import RejectSVG from '@/icons/Reject'
import OtherSVG from '@/icons/menu/Feedback'

type TWrapper = {
  state: TArticleState
  smaller: boolean
}

export const Wrapper = styled.div<TWrapper>`
  color: ${theme('article.digest')};
  ${css.row('align-center')};
  padding: 0 5px;
  line-height: 20px;
  font-weight: 500;
  font-size: 12px;
`
export const IconWrapper = styled.div`
  ${css.size(16)};
  margin-right: 3px;
  ${css.row('align-both')};
`
export const BugWrapper = styled(Wrapper)<TWrapper>`
  color: ${theme('article.digest')};
`
export const QuestionWrapper = styled.div<{ smaller: boolean }>`
  color: ${theme('baseColor.green')};
  font-weight: 600;
  font-size: ${({ smaller }) => (smaller ? '12px' : '13px')};
  margin-right: ${({ smaller }) => (smaller ? '0' : '6px')};
`
export const LockWrapper = styled.div<{ smaller: boolean }>`
  color: ${theme('article.info')};
  font-size: ${({ smaller }) => (smaller ? '12px' : '14px')};
  margin-right: ${({ smaller }) => (smaller ? '0' : '6px')};
`

export const OtherWrapper = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
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
  QUESTION: commonIcon(QuestionSVG),
  OTHER: commonIcon(OtherSVG),
}
