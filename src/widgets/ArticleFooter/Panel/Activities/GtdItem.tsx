import { FC, memo } from 'react'

import { Item, GtdWipIcon, Highlight, Content } from '../../styles/panel/activities/gtd_item'

const GtdItem: FC = () => {
  return (
    <Item>
      <GtdWipIcon />
      <Content>
        <Highlight right={5}>bbb</Highlight>将状态改为 <Highlight>进行中</Highlight>
      </Content>
    </Item>
  )
}

export default memo(GtdItem)
