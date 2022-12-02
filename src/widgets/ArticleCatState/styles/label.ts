import styled from 'styled-components'

import type { TArticleState } from '@/spec'
import { isNoBgCase, getPadding, getFeatureColor, getBugColor } from './metric'

import { theme } from '@/utils/css'

type TWrapper = {
  noBg: boolean
  state: TArticleState
  smaller: boolean
}

export const Wrapper = styled.div<TWrapper>`
  color: ${({ state }) => getFeatureColor(state)};
  background-color: ${({ noBg, state }) =>
    isNoBgCase(noBg, state) ? 'transparent' : theme('gtdBadge.featBg')};
  padding: ${({ noBg, state, smaller }) => getPadding(noBg, state, smaller)}|;

  font-weight: ${({ noBg, state }) => (isNoBgCase(noBg, state) ? 400 : 600)};
  border-radius: ${({ noBg, state }) => (isNoBgCase(noBg, state) ? 0 : '6px')};
  font-size: 12px;
`
export const BugWrapper = styled(Wrapper)<TWrapper>`
  color: ${({ state }) => getBugColor(state)};
  background-color: ${({ noBg, state }) =>
    isNoBgCase(noBg, state) ? 'transparent' : theme('gtdBadge.bugBg')};
  /* font-size: 12px; */
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
