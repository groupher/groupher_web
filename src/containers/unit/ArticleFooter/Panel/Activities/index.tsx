import { FC, memo } from 'react'

import type { TAvatarLayout } from '@/spec'
import { mockUsers } from '@/utils/mock'

import ImgFallback from '@/widgets/ImgFallback'

import TagItem from './TagItem'
import GtdItem from './GtdItem'
import MentionItem from './MentionItem'

import {
  Wrapper,
  Item,
  Avatar,
  Highlight,
  Content,
  LastUpdate,
} from '../../styles/panel/activities'

type TProps = {
  avatarLayout: TAvatarLayout
}

const Activities: FC<TProps> = ({ avatarLayout }) => {
  const user = mockUsers(1)[0]

  return (
    <Wrapper>
      <Item>
        <Avatar
          src={user.avatar}
          avatarLayout={avatarLayout}
          fallback={<ImgFallback size={18} user={user} avatarLayout={avatarLayout} left={-3} />}
        />

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
