import { Wrapper, Item, Title, Icon } from '../../styles/help/block_layout/block_menu'

const BlockMenu = () => {
  return (
    <Wrapper>
      <Item>
        <Icon.ArrowLeft />
        <Title>左移</Title>
      </Item>
      <Item>
        <Icon.ArrowRight />
        <Title>右移</Title>
      </Item>
      <Item>
        <Icon.Arrow2Top />
        <Title>移至最前</Title>
      </Item>
      <Item>
        <Icon.Arrow2Bottom />
        <Title>移至最后</Title>
      </Item>
    </Wrapper>
  )
}

export default BlockMenu
