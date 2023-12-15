import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useAvatarLayout from '@/hooks/useAvatarLayout'
import { mockUsers } from '@/mock'

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

const Activities: FC = () => {
  const avatarLayout = useAvatarLayout()

  const user = mockUsers(1)[0]

  return (
    <Wrapper>
      <Item>
        <Avatar
          src={user.avatar}
          $avatarLayout={avatarLayout}
          fallback={<ImgFallback size={18} user={user} left={-3} />}
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

export default observer(Activities)
