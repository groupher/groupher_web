import { FC, memo } from 'react'

import { Item, TagIcon, Highlight, Content } from '../../styles/panel/activities/tab_item'

const TagItem: FC = () => {
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
