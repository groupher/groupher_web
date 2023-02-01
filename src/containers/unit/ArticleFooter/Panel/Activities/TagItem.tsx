import { FC, memo } from 'react'

import { Br } from '@/widgets/Common'
import { mockUsers } from '@/utils/mock'

import { Item, TagIcon, Highlight, Content } from '../../styles/panel/activities/tab_item'

const TagItem: FC = () => {
  const user = mockUsers(1)[0]

  return (
    <Item>
      <TagIcon />
      <Content>
        <Highlight right={5}>xxx</Highlight>设置了标签 <Highlight>xxx</Highlight>
      </Content>
    </Item>
  )
}

export default memo(TagItem)
