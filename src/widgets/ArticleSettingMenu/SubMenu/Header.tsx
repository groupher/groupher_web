import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'

import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

import { Icon } from '../styles/icon'
import { Wrapper, InfoIcon } from '../styles/sub_menu/header'

type TProps = {
  type: TSubMenu
}

const Header: FC<TProps> = ({ type }) => {
  switch (type) {
    case SUB_MENU_TYPE.SLUG: {
      return (
        <Wrapper>
          <Icon.Slug />
          设置路径 (Slug)
          <SpaceGrow />
          <InfoIcon />
        </Wrapper>
      )
    }

    default: {
      return (
        <Wrapper>
          <div>??</div>
          <SpaceGrow />
          <InfoIcon />
        </Wrapper>
      )
    }
  }
}

export default Header
