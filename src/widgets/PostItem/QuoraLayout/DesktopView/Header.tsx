import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import TimeAgo from 'timeago-react'

import type { TPost } from '@/spec'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useBannerLayout from '@/hooks/useBannerLayout'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { THREAD } from '@/constant/thread'
import { BANNER_LAYOUT } from '@/constant/layout'
import SIZE from '@/constant/size'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import Tooltip from '@/widgets/Tooltip'
import { SpaceGrow, Space } from '@/widgets/Common'
import TagsList from '@/widgets/TagsList'
import CommentsCount from '@/widgets/CommentsCount'

import {
  Wrapper,
  Topping,
  Main,
  Dot,
  Title,
  PublishTime,
  AuthorName,
} from '../../styles/quora_layout/desktop_view/header'

const UserCard = dynamic(() => import('@/widgets/Cards/UserCard'), {
  ssr: false,
})

type TProps = {
  article: TPost
  onClick: () => void
}

const Header: FC<TProps> = ({ article, onClick }) => {
  const { slug } = useViewingCommunity()
  const bannerLayout = useBannerLayout()
  const primaryColor = usePrimaryColor()

  const { author, title, commentsCount, innerId, articleTags, insertedAt } = article

  return (
    <Wrapper onClick={onClick}>
      <Topping>
        <Tooltip
          //  @ts-ignore
          content={<UserCard user={author} />}
          placement="right"
          delay={500}
        >
          <AuthorName>{author.nickname}</AuthorName>
        </Tooltip>
        <Dot radius={2.5} space={10} />
        <Space right={2} />
        <PublishTime>
          <TimeAgo datetime={insertedAt} locale="zh_CN" />
        </PublishTime>
      </Topping>
      <Main>
        <Title
          onClick={(e) => e.preventDefault()}
          href={`/${slug}/${THREAD.POST}/${innerId}`}
          isPinned={article.isPinned}
          $color={primaryColor}
        >
          <ArticleReadLabel viewed={article.viewerHasViewed} right={8} top={1} size={7} />
          {title}
        </Title>

        {/*  @ts-ignore */}
        <TagsList items={articleTags} left={12} top={2} />
        <SpaceGrow />
        {commentsCount !== 0 && (
          <CommentsCount
            count={commentsCount}
            size={SIZE.MEDIUM}
            right={bannerLayout === BANNER_LAYOUT.SIDEBAR ? 4 : 0}
          />
        )}
      </Main>
    </Wrapper>
  )
}

export default observer(Header)
