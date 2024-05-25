import MenuItem from '@/widgets/MenuItem'
import MENU from '@/const/menu'

import { Wrapper } from '../../styles/doc/block_layout/block_menu'

const BlockMenu = () => {
  return (
    <Wrapper>
      <MenuItem icon={MENU.ARROW_LEFT} title="左移" />
      <MenuItem icon={MENU.ARROW_RIGHT} title="右移" />

      <MenuItem icon={MENU.ARROW_TO_TOP} title="移至最前" />
      <MenuItem icon={MENU.ARROW_TO_BOTTOM} title="移至最后" />
    </Wrapper>
  )
}

export default BlockMenu
