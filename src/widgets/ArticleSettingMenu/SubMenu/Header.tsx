import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'

import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

import { Icon } from '../styles/icon'
import { Wrapper, Hint, InfoIcon, Help } from '../styles/sub_menu/header'

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
          <Hint>
            <InfoIcon />
            <Help href="/">帮助</Help>
          </Hint>
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
