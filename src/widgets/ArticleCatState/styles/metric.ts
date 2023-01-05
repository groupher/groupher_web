import type { TArticleState } from '@/spec'

import { ARTICLE_STATE } from '@/constant/article_cat_state'
import { theme } from '@/utils/css'
import { isRejectedState } from '@/utils/helper'

export const isNoBgCase = (kanbanLayout: boolean, state: TArticleState): boolean => {
  return kanbanLayout || state === ARTICLE_STATE.DEFAULT || isRejectedState(state)
}

export const getFeatureColor = (state: TArticleState) => {
  if (isRejectedState(state)) {
    return theme('article.info')
  }

  return state === ARTICLE_STATE.DEFAULT ? theme('article.info') : theme('gtdBadge.feat')
}

export const getBugColor = (state: TArticleState) => {
  return state === ARTICLE_STATE.DEFAULT ? theme('article.info') : theme('gtdBadge.bug')
}

export const getPadding = (
  kanbanLayout: boolean,
  state: TArticleState,
  smaller: boolean,
): number | string => {
  const padding = smaller ? '0px 6px 0px 6px;' : '3px 8px;'

  return isNoBgCase(kanbanLayout, state) ? 0 : padding
}
