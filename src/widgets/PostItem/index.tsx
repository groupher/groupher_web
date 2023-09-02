/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost, TC11N, TPostLayout, TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT, POST_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/utils/logger'

import PHLayout from './PHLayout'
import QuoraLayout from './QuoraLayout'
import MinimalLayout from './MinimalLayout'
import CoverLayout from './CoverLayout'
import MasonryLayout from './MasonryLayout'

/* eslint-disable-next-line */
const log = buildLog('w:PostItem:index')

type TProps = {
  article: TPost
  c11n: TC11N
  layout?: TPostLayout
  isMobilePreview?: boolean

  avatarLayout?: TAvatarLayout
}

const PostItem: FC<TProps> = ({
  article,
  layout = POST_LAYOUT.QUORA,
  isMobilePreview = false,
  c11n,
  avatarLayout = AVATAR_LAYOUT.SQUARE,
}) => {
  return (
    <>
      {layout === POST_LAYOUT.MINIMAL && (
        <MinimalLayout c11n={c11n} article={article} isMobilePreview={isMobilePreview} />
      )}

      {layout === POST_LAYOUT.QUORA && (
        <QuoraLayout
          article={article}
          isMobilePreview={isMobilePreview}
          avatarLayout={avatarLayout}
        />
      )}

      {layout === POST_LAYOUT.PH && (
        <PHLayout
          c11n={c11n}
          article={article}
          isMobilePreview={isMobilePreview}
          avatarLayout={avatarLayout}
        />
      )}

      {layout === POST_LAYOUT.COVER && (
        <CoverLayout c11n={c11n} article={article} isMobilePreview={isMobilePreview} />
      )}

      {layout === POST_LAYOUT.MASONRY && <MasonryLayout article={article} />}
    </>
  )
}

export default memo(PostItem)
