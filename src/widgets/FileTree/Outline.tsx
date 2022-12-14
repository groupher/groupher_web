import { FC } from 'react'

import { Wrapper, Item, Index } from './styles/outline'

const items = [
  {
    id: '0',
    title: '常用的 AST 节点类型对照表',
    active: false,
  },
  {
    id: '1',
    title: 'babel 插件的实现思路',
    active: true,
  },
  {
    id: '2',
    title: '插件的基本格式示意列',
    active: false,
  },
]

const Outline: FC = () => {
  return (
    <Wrapper>
      {items.map((item) => (
        <Item key={item.id} $active={item.active}>
          {item.active && <Index />}

          {item.title}
        </Item>
      ))}
    </Wrapper>
  )
}

export default Outline
