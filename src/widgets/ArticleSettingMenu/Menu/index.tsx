import { type FC, memo, useState, useRef } from 'react'

import useOutsideClick from '~/hooks/useOutsideClick'

import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'
import SubMenu from '../SubMenu'

import CatItem from './CatItem'
import TagsItem from './TagsItem'
import PinItem from './PinItem'
import StateItem from './StateItem'

import { Icon } from '../styles/icon'
import { Wrapper, MenuItem, MenuTitle, DangerMenuItem, ItemDivider } from '../styles/menu'

type TProps = {
  onSubMenuToggle: (t: boolean) => void
  onClose: () => void
}

const Menu: FC<TProps> = ({ onSubMenuToggle, onClose }) => {
  const [subMenuType, setSubMenuType] = useState<TSubMenu>(null)
  const [subMenuActive, setSubMenuActive] = useState(false)

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
    <Wrapper ref={ref} $subMenuType={subMenuType}>
      {!subMenuActive ? (
        <>
          <MenuItem onClick={() => openSubMenu(SUB_MENU_TYPE.EDIT)}>
            <Icon.Edit />
            <MenuTitle>修改标题</MenuTitle>
            <div className="grow" />
            <Icon.Arrow />
          </MenuItem>

          <MenuItem onClick={() => openSubMenu(SUB_MENU_TYPE.SLUG)}>
            <Icon.Slug />
            <MenuTitle>设置路径</MenuTitle>
            <div className="grow" />
            <Icon.Arrow />
          </MenuItem>
          <ItemDivider />
          <CatItem onClick={() => openSubMenu(SUB_MENU_TYPE.CATEGORY)} />
          <StateItem onClick={() => openSubMenu(SUB_MENU_TYPE.STATE)} />
          <TagsItem onClick={() => openSubMenu(SUB_MENU_TYPE.TAGS)} />
          <ItemDivider />
          <PinItem />
          <MenuItem>
            <Icon.Lock />
            <MenuTitle>关闭评论</MenuTitle>
          </MenuItem>
          <MenuItem>
            <Icon.Merge />
            <MenuTitle>合并</MenuTitle>
            <div className="grow" />
            <Icon.Arrow />
          </MenuItem>
          <MenuItem>
            <Icon.Archived />
            <MenuTitle>归档</MenuTitle>
          </MenuItem>
          <MenuItem onClick={() => openSubMenu(SUB_MENU_TYPE.MIRROR)}>
            <Icon.Mirror />
            <MenuTitle>镜像:Groupher</MenuTitle>
            <div className="grow" />
            <Icon.Arrow />
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
