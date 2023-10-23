import { FC, memo, useState, useRef } from 'react'

import useTagLayout from '@/hooks/useTagLayout'
import useOutsideClick from '@/hooks/useOutsideClick'
import { SpaceGrow } from '@/widgets/Common'
import { TAG_LAYOUT } from '@/constant/layout'

import type { TSubMenu } from './spec'
import { SUB_MENU_TYPE } from './constant'
import SubMenu from './SubMenu'

import { Icon } from './styles/icon'
import { Wrapper, MenuItem, DangerMenuItem, ItemDivider } from './styles/menu'

type TProps = {
  onSubMenuToggle: (t: boolean) => void
  onClose: () => void
}

const Menu: FC<TProps> = ({ onSubMenuToggle, onClose }) => {
  const [subMenuType, setSubMenuType] = useState<TSubMenu>(null)
  const [subMenuActive, setSubMenuActive] = useState(false)

  const tagLayout = useTagLayout()

  const ref = useRef(null)
  useOutsideClick(ref, () => {
    if (subMenuActive) {
      setSubMenuActive(false)
      onSubMenuToggle(false)
      setSubMenuType(null)
      onClose()
    }
  })

  const openSubMenu = (type) => {
    setSubMenuActive(true)
    onSubMenuToggle(true)
    setSubMenuType(type)
  }

  const closeSubMenu = () => {
    setSubMenuActive(false)
    setSubMenuType(null)
    // avoid trigger Tippy's onHide immediately
    setTimeout(() => {
      onSubMenuToggle(false)
    })
  }

  return (
    <Wrapper ref={ref} subMenuType={subMenuType}>
      {!subMenuActive ? (
        <>
          <MenuItem onClick={() => openSubMenu(SUB_MENU_TYPE.SLUG)}>
            <Icon.Slug />
            设置路径
            <SpaceGrow />
            <Icon.Arrow />
          </MenuItem>
          <ItemDivider />
          <MenuItem>
            <Icon.Light />
            功能建议
            <SpaceGrow />
            <Icon.Arrow />
          </MenuItem>
          <MenuItem>
            <Icon.Todo />
            设置状态
            <SpaceGrow />
            <Icon.Arrow />
          </MenuItem>
          <MenuItem>
            {tagLayout === TAG_LAYOUT.HASH ? <Icon.TagHash /> : <Icon.TagDot />}
            标签
            <SpaceGrow />
            <Icon.Arrow />
          </MenuItem>
          <ItemDivider />
          <MenuItem>
            <Icon.Pin />
            置顶
          </MenuItem>
          <MenuItem>
            <Icon.Lock />
            关闭评论
          </MenuItem>
          <MenuItem>
            <Icon.Merge />
            合并
            <SpaceGrow />
            <Icon.Arrow />
          </MenuItem>
          <MenuItem>
            <Icon.Archived />
            归档
          </MenuItem>
          <DangerMenuItem>
            <Icon.Delete />
            删除
          </DangerMenuItem>
        </>
      ) : (
        <SubMenu closeSubMenu={closeSubMenu} subMenuType={subMenuType} />
      )}
    </Wrapper>
  )
}

export default memo(Menu)
