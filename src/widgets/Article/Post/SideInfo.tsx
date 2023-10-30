import { FC } from 'react'
import { observer } from 'mobx-react'

import { upvoteArticle } from '@/signal'
import useViewingArticle from '@/hooks/useViewingArticle'
import { AVATAR_LAYOUT, UPVOTE_LAYOUT } from '@/constant/layout'

import { Br } from '@/widgets/Common'
import Upvote from '@/widgets/Upvote'
import ArticleCatState from '@/widgets/ArticleCatState'
import TagsList from '@/widgets/TagsList'
import ReadableDate from '@/widgets/ReadableDate'

import {
  Wrapper,
  InnerWrapper,
  UserList,
  User,
  Avatar,
  Nickname,
  Label,
  Count,
  Value,
} from '../styles/post/side_info'

const SideInfo: FC = () => {
  const { article } = useViewingArticle()

  const { insertedAt, articleTags, upvotesCount, meta, viewerHasUpvoted, cat, state } = article
  const { latestUpvotedUsers } = meta

  // const users = mockUsers(5)

  return (
    <Wrapper>
      <InnerWrapper>
        <Upvote
          count={upvotesCount}
          avatarList={latestUpvotedUsers}
          viewerHasUpvoted={viewerHasUpvoted}
          onAction={(viewerHasUpvoted) => upvoteArticle(article, viewerHasUpvoted)}
          type={UPVOTE_LAYOUT.ARTICLE}
          bottom={35}
        />

        <Label>
          参与投票 <Count>{upvotesCount}</Count>
        </Label>
        <UserList>
          {latestUpvotedUsers.map((user) => (
            <User key={user.id}>
              <Avatar src={user.avatar} $avatarLayout={AVATAR_LAYOUT.SQUARE} />
              <Nickname>{user.nickname}</Nickname>
            </User>
          ))}
        </UserList>

        <Br bottom={25} />
        <Label>分类</Label>
        <ArticleCatState cat={cat} state={state} smaller={false} />
        <Br bottom={25} />
        <Label>标签</Label>
        <Value>
          <TagsList items={articleTags} size="medium" left={2} />
        </Value>

        <Br bottom={25} />

        <Label>发布时间</Label>
        <Value>
          <ReadableDate date={insertedAt} withTime={false} />
        </Value>
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(SideInfo)
