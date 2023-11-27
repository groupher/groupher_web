import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import TagNode from '@/widgets/TagNode'

import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

import { Icon } from '../styles/icon'
import { Wrapper, Hint, InfoIcon, Help } from '../styles/sub_menu/header'

type TProps = {
  type: TSubMenu
}

const Header: FC<TProps> = ({ type }) => {
  let Content = null

  switch (type) {
    case SUB_MENU_TYPE.EDIT: {
      Content = (
        <>
          <Icon.Edit />
          修改标题
          <SpaceGrow />
          <Hint>
            <InfoIcon />
            <Help href="/">帮助</Help>
          </Hint>
        </>
      )

      break
    }

    case SUB_MENU_TYPE.CATEGORY: {
      Content = (
        <>
          <Icon.Category />
          设置分类
          <SpaceGrow />
          <Hint>
            <InfoIcon />
            <Help href="/">帮助</Help>
          </Hint>
        </>
      )

      break
    }

    case SUB_MENU_TYPE.STATE: {
      Content = (
        <>
          <Icon.State />
          设置状态
          <SpaceGrow />
          <Hint>
            <InfoIcon />
            <Help href="/">帮助</Help>
          </Hint>
        </>
      )

      break
    }

    case SUB_MENU_TYPE.SLUG: {
      Content = (
        <>
          <Icon.Slug />
          设置路径 (Slug)
          <SpaceGrow />
          <Hint>
            <InfoIcon />
            <Help href="/">帮助</Help>
          </Hint>
        </>
      )

      break
    }

    case SUB_MENU_TYPE.MIRROR: {
      Content = (
        <>
          <Icon.Slug />
          镜像到 Groupher
          <SpaceGrow />
          <Hint>
            <InfoIcon />
            <Help href="/">帮助</Help>
          </Hint>
        </>
      )

      break
    }

    case SUB_MENU_TYPE.TAGS: {
      Content = (
        <>
          <TagNode opacity={0.6} dotSize={8} dotLeft={4} hashLeft={4} hashSize={13} />
          设置标签
          <SpaceGrow />
          <Hint>
            <InfoIcon />
            <Help href="/">帮助</Help>
          </Hint>
        </>
      )
      break
    }

    default: {
      Content = (
        <>
          <div>??</div>
          <SpaceGrow />
          <InfoIcon />
        </>
      )
    }
  }

  return <Wrapper>{Content}</Wrapper>
}

export default Header
