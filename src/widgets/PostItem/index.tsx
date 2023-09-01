/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TCommunity, TPost, TAccount, TC11N, TPostLayout, TAvatarLayout } from '@/spec'
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
  curCommunity: TCommunity | null
  article: TPost
  c11n: TC11N
  layout?: TPostLayout
  isMobilePreview?: boolean

  onAuthorSelect?: (obj: TAccount) => void
  avatarLayout?: TAvatarLayout
}

const PostItem: FC<TProps> = ({
  curCommunity,
  article,
  onAuthorSelect = log,
  layout = POST_LAYOUT.QUORA,
  isMobilePreview = false,
  c11n,
  avatarLayout = AVATAR_LAYOUT.SQUARE,
}) => {
  return (
    <>
      {layout === POST_LAYOUT.MINIMAL && (
        <MinimalLayout
          c11n={c11n}
          article={article}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
        />
      )}

      {layout === POST_LAYOUT.QUORA && (
        <QuoraLayout
          article={article}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
          avatarLayout={avatarLayout}
        />
      )}

      {layout === POST_LAYOUT.PH && (
        <PHLayout
          c11n={c11n}
          article={article}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
          avatarLayout={avatarLayout}
        />
      )}

      {layout === POST_LAYOUT.COVER && (
        <CoverLayout
          c11n={c11n}
          article={article}
          onAuthorSelect={onAuthorSelect}
          isMobilePreview={isMobilePreview}
        />
      )}

      {layout === POST_LAYOUT.MASONRY && <MasonryLayout article={article} />}
    </>
  )
}

export default memo(PostItem)
