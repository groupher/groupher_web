import { FC } from 'react'

import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

import { Icon } from '../styles/icon'
import { MenuItem } from '../styles/menu'
import { Wrapper, Footer } from '../styles/sub_menu'

type TProps = {
  closeSubMenu: () => void
  subMenuType: TSubMenu
}

const SubMenu: FC<TProps> = ({ closeSubMenu, subMenuType }) => {
  switch (subMenuType) {
    case SUB_MENU_TYPE.SLUG: {
      return (
        <Wrapper>
          <MenuItem>
            <Icon.Archived />
            sub menu
          </MenuItem>
          <Footer>
            <MenuItem onClick={() => closeSubMenu()}>返回</MenuItem>
          </Footer>
        </Wrapper>
      )
    }
    default: {
      return (
        <Wrapper>
          <MenuItem onClick={() => closeSubMenu()}>返回</MenuItem>
        </Wrapper>
      )
    }
  }
}

export default SubMenu
