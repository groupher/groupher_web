import type { TUpvoteLayout } from '@/spec'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import { theme } from '@/utils/css'

export const getIconColor = ($active: boolean): string => {
  if ($active) return theme('article.title')

  return theme('article.info')
}

export const getIconSize = (type: TUpvoteLayout): string => {
  switch (type) {
    case UPVOTE_LAYOUT.ARTICLE: {
      return '30px;'
    }

    case UPVOTE_LAYOUT.COMMENT: {
      return '15px;'
    }

    default: {
      return ' 15px;'
    }
  }
}
