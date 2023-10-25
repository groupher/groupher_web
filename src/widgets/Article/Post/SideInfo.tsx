import { FC } from 'react'

import type { TPost } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import { AVATAR_LAYOUT } from '@/constant/layout'

import { mockUsers } from '@/mock'

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

type TProps = {
  article: TPost
}

const SideInfo: FC<TProps> = ({ article }) => {
  const { insertedAt, articleTags, upvotesCount, meta, viewerHasUpvoted } = article
  const { latestUpvotedUsers } = meta

  const users = mockUsers(5)

  return (
    <Wrapper>
      <InnerWrapper>
        <Upvote
          count={upvotesCount}
          avatarList={users}
          viewerHasUpvoted={viewerHasUpvoted}
          type="article"
          bottom={35}
        />

        <Label>
          参与投票 <Count>{upvotesCount}</Count>
        </Label>
        <UserList>
          {latestUpvotedUsers.map((user) => (
            <User key={user.id}>
              <Avatar src={user.avatar} avatarLayout={AVATAR_LAYOUT.SQUARE} />
              <Nickname>{user.nickname}</Nickname>
            </User>
          ))}
        </UserList>

        <Br bottom={25} />

        <Label>分类</Label>
        <ArticleCatState cat={ARTICLE_CAT.FEATURE} state={ARTICLE_STATE.WIP} smaller={false} />

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

export default SideInfo
