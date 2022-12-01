import styled from 'styled-components'

import type { TArticleState } from '@/spec'
import { isNoBgCase, getPadding, getFeatureColor, getBugColor } from './metric'

import { theme } from '@/utils/css'

type TWrapper = {
  kanbanLayout: boolean
  state: TArticleState
  smaller: boolean
}

export const Wrapper = styled.div<TWrapper>`
  color: ${({ state }) => getFeatureColor(state)};
  background-color: ${({ kanbanLayout, state }) =>
    isNoBgCase(kanbanLayout, state) ? 'transparent' : theme('gtdBadge.featBg')};
  padding: ${({ kanbanLayout, state, smaller }) =>
    getPadding(kanbanLayout, state, smaller)}|;

  font-weight: ${({ kanbanLayout, state }) =>
    isNoBgCase(kanbanLayout, state) ? 400 : 600};
  border-radius: ${({ kanbanLayout, state }) =>
    isNoBgCase(kanbanLayout, state) ? 0 : '6px'};
  font-size: 12px;
`
export const BugWrapper = styled(Wrapper)<TWrapper>`
  color: ${({ state }) => getBugColor(state)};
  background-color: ${({ kanbanLayout, state }) =>
    isNoBgCase(kanbanLayout, state) ? 'transparent' : theme('gtdBadge.bugBg')};
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
