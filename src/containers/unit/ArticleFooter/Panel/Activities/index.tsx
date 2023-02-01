import { FC, memo } from 'react'

import type { TAvatarLayout } from '@/spec'
import { Br } from '@/widgets/Common'
import { mockUsers } from '@/utils/mock'

import TagItem from './TagItem'
import GtdItem from './GtdItem'
import MentionItem from './MentionItem'

import ActionItem from './ActionItem'

import {
  Wrapper,
  Item,
  Avatar,
  Highlight,
  Content,
  LastUpdate,
} from '../../styles/panel/activities'

const tmpItems = [
  {
    id: '0',
    author: {
      login: '1',
      nickname: 'mydearxym',
      avatar: 'https://avatars2.githubusercontent.com/u/6184465?v=4',
    },
    insertedAt: '3天前',
    article: {
      title: '这个社区太棒了',
    },
    community: {
      raw: 'javascript',
    },
  },
]

type TProps = {
  avatarLayout: TAvatarLayout
}

const Activities: FC<TProps> = ({ avatarLayout }) => {
  const user = mockUsers(1)[0]

  return (
    <Wrapper>
      <Item>
        <Avatar src={user.avatar} avatarLayout={avatarLayout} />
        <Content>
          <Highlight left={-3} right={5}>
            mydearxym
          </Highlight>
          发布于 3 天前
        </Content>
      </Item>

      <TagItem />
      <GtdItem />
      <MentionItem />

      {/* {tmpItems.map((item) => (
        <ActionItem key={item.id} item={item} />
      ))} */}

      <LastUpdate>最后回复: 14天前</LastUpdate>
    </Wrapper>
  )
}

export default memo(Activities)
