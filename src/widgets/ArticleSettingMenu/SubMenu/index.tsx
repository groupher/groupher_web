import { FC } from 'react'

import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

import Header from './Header'
import SlugSetting from './SlugSetting'
import TagSetting from './TagSetting'
import TitleSetting from './TitleSetting'

import { Wrapper } from '../styles/sub_menu'

type TProps = {
  closeSubMenu: () => void
  subMenuType: TSubMenu
}

const SubMenu: FC<TProps> = ({ closeSubMenu, subMenuType }) => {
  let Content = null

  switch (subMenuType) {
    case SUB_MENU_TYPE.EDIT: {
      Content = TitleSetting
      break
    }

    case SUB_MENU_TYPE.SLUG: {
      Content = SlugSetting
      break
    }

    case SUB_MENU_TYPE.TAG: {
      Content = TagSetting
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
      <Content onBack={closeSubMenu} />
    </Wrapper>
  )
}

export default SubMenu
