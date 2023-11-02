import { FC, memo } from 'react'

import { Item, MentionIcon, Highlight, Content } from '../../styles/panel/activities/mention_item'

const MentionItem: FC = () => {
  return (
    <Item>
      <MentionIcon />
      <Content>
        <Highlight>xxx </Highlight>在<Highlight left={5}>这个社区太棒了</Highlight>中提及
      </Content>
    </Item>
  )
}

export default memo(MentionItem)
