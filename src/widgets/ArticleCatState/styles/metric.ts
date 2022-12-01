import type { TArticleState } from '@/spec'
import { ARTICLE_STATE } from '@/constant'

import { theme } from '@/utils/css'

export const isNoBgCase = (
  kanbanLayout: boolean,
  state: TArticleState,
): boolean => {
  return (
    kanbanLayout ||
    state === ARTICLE_STATE.DEFAULT ||
    state === ARTICLE_STATE.REJECT
  )
}

export const getFeatureColor = (state: TArticleState) => {
  return state === ARTICLE_STATE.DEFAULT
    ? theme('article.info')
    : theme('gtdBadge.feat')
}

export const getBugColor = (state: TArticleState) => {
  return state === ARTICLE_STATE.DEFAULT
    ? theme('article.info')
    : theme('gtdBadge.bug')
}

export const getPadding = (
  kanbanLayout: boolean,
  state: TArticleState,
  smaller: boolean,
): number | string => {
  const padding = smaller ? '1px 6px 1px 6px;' : '3px 8px;'

  return isNoBgCase(kanbanLayout, state) ? 0 : padding
}
