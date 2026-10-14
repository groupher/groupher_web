import type { FC } from 'react'

import { COMMUNITY_LAYOUT } from '~/const/layout'
import SIZE from '~/const/size'
import { THREAD_PATH } from '~/const/thread'
import useLayout from '~/hooks/useLayout'
import type { TArticleStats, TArticleViewerState, TPost } from '~/spec'
import useCommunity from '~/stores/community/hooks'
import UserCard from '~/ui/Cards/UserCard'
import CommunityPreviewLink from '~/ui/CommunityPreviewLink'
import TimeAgo from '~/ui/TimeAgo'
import Tooltip from '~/ui/Tooltip'
import CommentsCount from '~/unit/CommentsCount'
import TagsList from '~/unit/TagsList'

import ArticleReadLabel from '../../ArticleReadLabel'
import useSalon from '../salon/quora_layout/header'

type TProps = {
  article: TPost
  stats: TArticleStats | null
  viewerState: TArticleViewerState
}

const Header: FC<TProps> = ({ article, stats, viewerState }) => {
  const { slug } = useCommunity()
  const { communityLayout } = useLayout()
  const { isPinned } = article

  const s = useSalon({ isPinned })

  const { author, title, innerId, communityTags, insertedAt } = article

  return (
    <section className={s.wrapper}>
      <div className={s.topping}>
        <Tooltip
          key={article.title}
          content={<UserCard user={author} />}
          placement='bottom-start'
          offset={[-5, 0]}
          delay={500}
        >
          <div className={s.author}>{author.nickname}</div>
        </Tooltip>
        <div className={s.dot} />
        <div className='mr-0.5' />
        <div className={s.publish}>
          <TimeAgo datetime={insertedAt} />
        </div>
      </div>
      <div className={s.main}>
        <CommunityPreviewLink
          className={s.title}
          href={`/${slug}/${THREAD_PATH.POST}/${innerId}`}
          previewId={innerId}
        >
          <ArticleReadLabel viewed={viewerState.viewerHasViewed} />
          {title}
        </CommunityPreviewLink>

        <TagsList items={communityTags} left={2} top='px' />
        <div className='grow' />
        {(stats?.commentsCount ?? 0) !== 0 && (
          <CommentsCount
            count={stats?.commentsCount}
            size={SIZE.MEDIUM}
            right={communityLayout === COMMUNITY_LAYOUT.SIDEBAR ? 4 : 0}
          />
        )}
      </div>
    </section>
  )
}

export default Header
