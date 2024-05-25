/*
 *
 * DashboardDesc
 *
 */

import { FC, memo, Fragment } from 'react'

import type { TPost, TPostLayout } from '@/spec'
import { POST_LAYOUT } from '@/const/layout'

import { buildLog } from '@/logger'

import MasonryCards from '@/widgets/MasonryCards'
import PostItem from '@/widgets/PostItem'

const _log = buildLog('w:DashboardDesc:index')

type TProps = {
  articles: TPost[]
  layout: TPostLayout
}

const PostLayoutExample: FC<TProps> = ({ articles, layout }) => {
  return (
    <Fragment>
      {layout === POST_LAYOUT.QUORA && (
        <>
          {articles.map((item) => (
            <PostItem key={item.id} article={item} />
          ))}
        </>
      )}

      {layout === POST_LAYOUT.PH && (
        <>
          {articles.map((item) => (
            <PostItem key={item.id} article={item} />
          ))}
        </>
      )}

      {layout === POST_LAYOUT.MASONRY && (
        <>
          <MasonryCards column={2}>
            {articles.map((item) => (
              <PostItem key={item.id} article={item} />
            ))}
          </MasonryCards>
        </>
      )}

      {layout === POST_LAYOUT.MINIMAL && (
        <>
          {articles.map((item) => (
            <PostItem key={item.id} article={item} />
          ))}
        </>
      )}

      {layout === POST_LAYOUT.COVER && (
        <>
          {articles.map((item) => (
            <PostItem key={item.id} article={item} />
          ))}
        </>
      )}
    </Fragment>
  )
}

export default memo(PostLayoutExample)
