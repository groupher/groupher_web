/*
 *
 * PostItem
 *
 */

import type { FC } from 'react'

import type { TPost, TPostLayout } from '~/spec'
import { POST_LAYOUT } from '~/const/layout'

import PHLayout from './PHLayout'
import QuoraLayout from './QuoraLayout'
import MinimalLayout from './MinimalLayout'
import CoverLayout from './CoverLayout'
import MasonryLayout from './MasonryLayout'

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

export default PostItem
