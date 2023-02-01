import { FC, memo } from 'react'

import { mockUsers } from '@/utils/mock'

import { Item, GtdWipIcon, Highlight, Content } from '../../styles/panel/activities/gtd_item'

const GtdItem: FC = () => {
  const user = mockUsers(1)[0]

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
