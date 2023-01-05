import styled from 'styled-components'

import type { TArticleCat } from '@/spec'
import { ARTICLE_CAT } from '@/constant/article_cat_state'

import css, { theme } from '@/utils/css'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'
import ResolveSVG from '@/icons/Hook'
import RejectSVG from '@/icons/Reject'

import LightSVG from '@/icons/Light'
import BugSVG from '@/icons/Bug'
import QuestionSVG from '@/icons/Question'

type TType = { cat: TArticleCat; smaller: boolean }

export const Wrapper = styled.div<TType>`
  ${({ smaller }) => (smaller ? css.size(20) : css.size(26))};

  ${css.flex('align-both')};
  background: ${({ cat }) =>
    cat === ARTICLE_CAT.BUG ? theme('gtdBadge.bugBg') : theme('gtdBadge.featBg')};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  margin-right: ${({ smaller }) => (smaller ? '-6px' : '-8px')};
`
export const NoBgWrapper = styled.div`
  margin-right: 2px;
  ${css.flex('align-both')};
`
export const WipIcon = styled(GtdWipSVG)<TType>`
  ${({ smaller }) => (smaller ? css.size(13) : css.size(15))};
  fill: ${({ cat }) => (cat === ARTICLE_CAT.BUG ? theme('gtdBadge.bug') : theme('gtdBadge.feat'))};
  z-index: 2;
`
export const DoneIcon = styled(GtdDoneSVG)<TType>`
  ${({ smaller }) => (smaller ? css.size(8) : css.size(10))};
  fill: ${({ cat }) => (cat === ARTICLE_CAT.BUG ? theme('gtdBadge.bug') : theme('gtdBadge.feat'))};
  margin-top: -1px;
`
export const TODOIcon = styled(GtdTodoSVG)<TType>`
  ${({ smaller }) => (smaller ? css.size(10) : css.size(12))};
  fill: ${({ cat }) => (cat === ARTICLE_CAT.BUG ? theme('gtdBadge.bug') : theme('gtdBadge.feat'))};
`
export const ResolveIcon = styled(ResolveSVG)<{ smaller: boolean }>`
  ${({ smaller }) => (smaller ? css.size(11) : css.size(17))};
  margin-right: 2px;
  fill: ${theme('baseColor.green')};
`
export const RejectIcon = styled(RejectSVG)<{ smaller: boolean }>`
  ${({ smaller }) => (smaller ? css.size(12) : css.size(14))};
  fill: ${theme('gtdBadge.bug')};
  margin-right: 3px;
  margin-top: -1px;
`
const LightIcon = styled(LightSVG)`
  ${css.size(12)};
  fill: ${theme('article.info')};
  margin-top: 1px;
`
const BugIcon = styled(BugSVG)`
  ${css.size(12)};
  fill: ${theme('article.info')};
  margin-right: 2px;
`
const QuestionIcon = styled(QuestionSVG)`
  ${css.size(9)};
  fill: ${theme('article.info')};
  margin-right: 2px;
`

export const NoBgIcon = {
  [ARTICLE_CAT.FEATURE]: LightIcon,
  [ARTICLE_CAT.BUG]: BugIcon,
  [ARTICLE_CAT.QUESTION]: QuestionIcon,
}
