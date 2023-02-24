import { FC } from 'react'

import type { TPost } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import { AVATAR_LAYOUT } from '@/constant/layout'

import { Br } from '@/widgets/Common'
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
} from '../styles/desktop_view/side_info'

type TProps = {
  article: TPost
}

const SideInfo: FC<TProps> = ({ article }) => {
  const { insertedAt, articleTags, upvotesCount, meta } = article
  const { latestUpvotedUsers } = meta

  return (
    <Wrapper>
      <InnerWrapper>
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

        <Label>标签</Label>
        <Value>
          <TagsList items={articleTags} size="small" />
        </Value>

        <Br bottom={25} />

        <Label>类别</Label>
        <ArticleCatState cat={ARTICLE_CAT.FEATURE} state={ARTICLE_STATE.WIP} smaller={false} />

        <Br bottom={25} />

        <Label>状态</Label>
        <Value>进行中</Value>

        <Br bottom={20} />
        <Label>发布时间</Label>
        <Value>
          <ReadableDate date={insertedAt} fmt="absolute" withTime={false} />
        </Value>
      </InnerWrapper>
    </Wrapper>
  )
}

export default SideInfo
