import { FC } from 'react'

import MenuItem from '@/widgets/MenuItem'
import MENU from '@/constant/menu'

import { Wrapper } from '../../styles/header/editors/block_menu'

const BlockMenu: FC = () => {
  return (
    <Wrapper>
      <MenuItem icon={MENU.ARROW_UP} title="上移" />
      <MenuItem icon={MENU.ARROW_DOWN} title="下移" />

      <MenuItem icon={MENU.ARROW_TO_TOP} title="移至最前" />
      <MenuItem icon={MENU.ARROW_TO_BOTTOM} title="移至最后" />
    </Wrapper>
  )
}

export default BlockMenu
