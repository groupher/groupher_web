import type { FC } from 'react'

import { SpaceGrow, SexyDivider } from '~/widgets/Common'
import {
  Wrapper,
  MenuItem,
  MenuTitle,
  DangerMenuItem,
  Icon,
  TagIcon,
} from '../../styles/dashboard_intros/cms_tab/menu_card'

const MenuCard: FC = () => {
  return (
    <Wrapper>
      <MenuItem>
        <Icon.Edit />
        <MenuTitle>修改标题</MenuTitle>
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>

      <MenuItem>
        <Icon.Slug />
        <MenuTitle>设置 Slug</MenuTitle>
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>
      <SexyDivider top={10} bottom={10} />
      <MenuItem>
        <Icon.FEATURE />
        <MenuTitle>功能请求</MenuTitle>
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>

      <MenuItem>
        <Icon.WIP />
        <MenuTitle>进行中</MenuTitle>
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>

      <MenuItem>
        <TagIcon />
        <MenuTitle>标签</MenuTitle>
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>

      <SexyDivider top={10} bottom={10} />

      <MenuItem>
        <Icon.Pin />
        <MenuTitle>置顶</MenuTitle>
      </MenuItem>

      <MenuItem>
        <Icon.Lock />
        <MenuTitle>关闭评论</MenuTitle>
      </MenuItem>
      <MenuItem>
        <Icon.Merge />
        <MenuTitle>合并</MenuTitle>
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>
      <MenuItem>
        <Icon.Archived />
        <MenuTitle>归档</MenuTitle>
      </MenuItem>
      <MenuItem>
        <Icon.Mirror />
        <MenuTitle>镜像:Groupher</MenuTitle>
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>
      <DangerMenuItem>
        <Icon.Delete />
        删除
      </DangerMenuItem>
    </Wrapper>
  )
}

export default MenuCard
