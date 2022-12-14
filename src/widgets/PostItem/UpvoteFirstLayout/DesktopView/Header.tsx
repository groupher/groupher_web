import { FC } from 'react'
import dynamic from 'next/dynamic'
import TimeAgo from 'timeago-react'

import type { TPost } from '@/spec'
import EVENT from '@/constant/event'
import SIZE from '@/constant/size'
import { send } from '@/utils/signal'

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
} from '../../styles/upvote_fist_layout/desktop_view/header'

const UserCard = dynamic(() => import('@/widgets/Cards/UserCard'), {
  ssr: false,
})

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { author, commentsCount } = article

  return (
    <Wrapper>
      <Topping>
        <Tooltip
          //  @ts-ignore
          content={<UserCard user={author} />}
          placement="right"
          delay={500}
        >
          <AuthorName href={`/u/${author.login}`} prefetch={false}>
            {author.nickname}
          </AuthorName>
        </Tooltip>
        <Dot radius={2.5} space={10} />
        <Space right={2} />
        <PublishTime>
          <TimeAgo datetime={article.insertedAt} locale="zh_CN" />
        </PublishTime>
      </Topping>
      <Main>
        <Title
          onClick={(e) => {
            // make page can open by user right click the menu
            e.preventDefault()
            send(EVENT.PREVIEW_ARTICLE, { article })
          }}
          href={`/post/${article.id}`}
        >
          {article.title}{' '}
        </Title>
        {/*  @ts-ignore */}
        <TagsList items={article.articleTags} left={12} />
        <SpaceGrow />
        {commentsCount !== 0 && <CommentsCount count={commentsCount} size={SIZE.MEDIUM} />}
      </Main>
    </Wrapper>
  )
}

export default Header
