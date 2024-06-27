import usePrimaryColor from '~/hooks/usePrimaryColor'

import { Wrapper, Item } from './styles/outline'

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

export default () => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      {items.map((item) => (
        <Item key={item.id} $active={item.active} $color={primaryColor}>
          {item.title}
        </Item>
      ))}
    </Wrapper>
  )
}
