import { Wrapper, Item, Title, Icon } from '../../styles/help/block_layout/file_menu'

const FileMenu = () => {
  return (
    <Wrapper>
      <Item>
        <Icon.ArrowUp />
        <Title>上移</Title>
      </Item>
      <Item>
        <Icon.ArrowDown />
        <Title>下移</Title>
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

export default FileMenu
