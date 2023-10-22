import { FC } from 'react'

import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

import Header from './Header'
import SlugSetting from './SlugSetting'

import { Wrapper, Footer, ArrowIcon, Confirm } from '../styles/sub_menu'

type TProps = {
  closeSubMenu: () => void
  subMenuType: TSubMenu
}

const SubMenu: FC<TProps> = ({ closeSubMenu, subMenuType }) => {
  let Content = null

  switch (subMenuType) {
    case SUB_MENU_TYPE.SLUG: {
      Content = SlugSetting
      break
    }
    default: {
      Content = <div>??</div>
      break
    }
  }

  return (
    <Wrapper>
      <Header type={subMenuType} />
      <Content />
      <Footer top={18}>
        <ArrowIcon onClick={() => closeSubMenu()} />
        <Confirm size="small">确认</Confirm>
      </Footer>
    </Wrapper>
  )
}

export default SubMenu
