import MenuItem from '@/widgets/MenuItem'
import MENU from '@/constant/menu'

import { Wrapper, Item, Title, Icon } from '../../styles/help/block_layout/file_menu'

const FileMenu = () => {
  return (
    <Wrapper>
      <MenuItem icon={MENU.ARROW_UP} title="上移" />
      <MenuItem icon={MENU.ARROW_DOWN} title="下移" />

      <MenuItem icon={MENU.ARROW_TO_TOP} title="移至最前" />
      <MenuItem icon={MENU.ARROW_TO_BOTTOM} title="移至最后" />
      <Item>
        <Icon.Transfor />
        <Title>移动到</Title>
      </Item>
    </Wrapper>
  )
}

export default FileMenu
