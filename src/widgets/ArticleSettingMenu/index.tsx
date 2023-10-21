/*
 *
 * ArticleSettingMenu
 *
 */

import { FC, memo, useState } from 'react'

import { buildLog } from '@/logger'

import type { TSpace } from '@/spec'

import Tooltip from '@/widgets/Tooltip'
import { SpaceGrow } from '@/widgets/Common'

import { Icon } from './styles/icon'
import { Wrapper, SettingIcon, MainPanel, MenuItem, DangerMenuItem, ItemDivider } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:ArticleSettingMenu:index')

type TProps = {
  testid?: string
} & TSpace

const ArticleSettingMenu: FC<TProps> = ({ testid = 'article-setting-menu', ...restProps }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Wrapper testid={testid} {...restProps}>
      <Tooltip
        content={
          <MainPanel>
            <MenuItem>
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
              <Icon.Tag />
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
              <SpaceGrow />
              <Icon.Arrow />
            </MenuItem>
            <DangerMenuItem>
              <Icon.Delete />
              删除
            </DangerMenuItem>
          </MainPanel>
        }
        placement="bottom-end"
        hideOnClick={false}
        onShow={() => setMenuOpen(true)}
        onHide={() => setMenuOpen(false)}
        trigger="click"
        noPadding
      >
        <SettingIcon $active={menuOpen} />
      </Tooltip>
    </Wrapper>
  )
}

export default memo(ArticleSettingMenu)
