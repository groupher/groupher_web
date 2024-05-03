/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost, TPostLayout } from '@/spec'
import { POST_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/logger'

import PHLayout from './PHLayout'
import QuoraLayout from './QuoraLayout'
import MinimalLayout from './MinimalLayout'
import CoverLayout from './CoverLayout'
import MasonryLayout from './MasonryLayout'

const _log = buildLog('w:PostItem:index')

type TProps = {
  article: TPost
  isMobilePreview?: boolean
  layout?: TPostLayout
}

const PostItem: FC<TProps> = ({ article, layout = POST_LAYOUT.QUORA, isMobilePreview = false }) => {
  switch (layout) {
    case POST_LAYOUT.MINIMAL: {
      return <MinimalLayout article={article} isMobilePreview={isMobilePreview} />
    }

    case POST_LAYOUT.PH: {
      return <PHLayout article={article} isMobilePreview={isMobilePreview} />
    }

    case POST_LAYOUT.COVER: {
      return <CoverLayout article={article} isMobilePreview={isMobilePreview} />
    }

    case POST_LAYOUT.MASONRY: {
      return <MasonryLayout article={article} />
    }

    default: {
      return <QuoraLayout article={article} isMobilePreview={isMobilePreview} />
    }
  }
}

export default memo(PostItem)
