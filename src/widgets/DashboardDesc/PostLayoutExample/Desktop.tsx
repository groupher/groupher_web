/*
 *
 * DashboardDesc
 *
 */

import { FC, memo, Fragment } from 'react'

import type { TPost, TPostLayout } from '@/spec'
import { POST_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/utils/logger'

import MasonryCards from '@/widgets/MasonryCards'
import PostItem from '@/widgets/PostItem'

/* eslint-disable-next-line */
const log = buildLog('w:DashboardDesc:index')

type TProps = {
  articles: TPost[]
  layout: TPostLayout
}

const PostLayoutExample: FC<TProps> = ({ articles, layout }) => {
  return (
    <Fragment>
      {layout === POST_LAYOUT.UPVOTE_FIRST && (
        <>
          {articles.map((item) => (
            <PostItem key={item.id} article={item} c11n={{}} curCommunity={{ slug: 'demo' }} />
          ))}
        </>
      )}

      {layout === POST_LAYOUT.COMMENT_FIRST && (
        <>
          {articles.map((item) => (
            <PostItem
              key={item.id}
              article={item}
              c11n={{}}
              curCommunity={{ slug: 'demo' }}
              layout={POST_LAYOUT.COMMENT_FIRST}
            />
          ))}
        </>
      )}

      {layout === POST_LAYOUT.MASONRY && (
        <>
          <MasonryCards column={2}>
            {articles.map((item) => (
              <PostItem
                key={item.id}
                article={item}
                c11n={{}}
                curCommunity={{ slug: 'demo' }}
                layout={POST_LAYOUT.MASONRY}
              />
            ))}
          </MasonryCards>
        </>
      )}

      {layout === POST_LAYOUT.MINIMAL && (
        <>
          {articles.map((item) => (
            <PostItem
              key={item.id}
              article={item}
              c11n={{}}
              curCommunity={{ slug: 'demo' }}
              layout={POST_LAYOUT.MINIMAL}
            />
          ))}
        </>
      )}

      {layout === POST_LAYOUT.COVER && (
        <>
          {articles.map((item) => (
            <PostItem
              key={item.id}
              article={item}
              c11n={{}}
              curCommunity={{ slug: 'demo' }}
              layout={POST_LAYOUT.COVER}
            />
          ))}
        </>
      )}
    </Fragment>
  )
}

export default memo(PostLayoutExample)
