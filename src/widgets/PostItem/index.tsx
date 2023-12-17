/*
 *
 * PostItem
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TPost } from '@/spec'
import { POST_LAYOUT } from '@/constant/layout'
import usePostLayout from '@/hooks/usePostLayout'
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
}

const PostItem: FC<TProps> = ({ article, isMobilePreview = false }) => {
  const postLayout = usePostLayout()

  switch (postLayout) {
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

export default observer(PostItem)
