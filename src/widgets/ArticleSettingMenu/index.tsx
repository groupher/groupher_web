/*
 *
 * ArticleSettingMenu
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import type { TSpace } from '@/spec'

import Tooltip from '@/widgets/Tooltip'

import { Icon } from './styles/icon'
import { Wrapper, SettingIcon, MainPanel, MenuItem } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:ArticleSettingMenu:index')

type TProps = {
  testid?: string
} & TSpace

const ArticleSettingMenu: FC<TProps> = ({ testid = 'article-setting-menu', ...restProps }) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      <Tooltip
        content={
          <MainPanel>
            <MenuItem>
              <Icon.Light />
              设置 slug
            </MenuItem>
            <MenuItem>
              <Icon.Pin />
              置顶
            </MenuItem>
            <MenuItem>分类</MenuItem>
            <MenuItem>状态</MenuItem>
            <MenuItem>标签</MenuItem>
            <MenuItem>关闭评论</MenuItem>
            <MenuItem>归档</MenuItem>
            <MenuItem>删除</MenuItem>
          </MainPanel>
        }
        placement="bottom-end"
        hideOnClick={false}
        trigger="click"
        noPadding
      >
        <SettingIcon />
      </Tooltip>
    </Wrapper>
  )
}

export default memo(ArticleSettingMenu)
