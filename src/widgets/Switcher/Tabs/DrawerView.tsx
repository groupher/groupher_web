/*
 *
 * Tabs
 *
 */

import { FC, useCallback, memo } from 'react'

import type { TTabItem } from '@/spec'
import { isString } from '@/validator'
import { buildLog } from '@/logger'

import { Wrapper, TabItem } from '../styles/tabs/drawer_view'

const log = buildLog('w:Tabs:index')

const temItems = [
  {
    title: '帖子',
    // icon: `${ICON_CMD}/navi/fire.svg`,
    localIcon: 'settings',
  },
]

type TProps = {
  items?: TTabItem[]
  onChange: () => void
  activeKey?: string
  // slipHeight: '1px' | '2px'
}

const Tabs: FC<TProps> = ({ onChange = log, items = temItems, activeKey = '' }) => {
  const handleItemClick = useCallback(
    (item) => {
      onChange(isString(item) ? item : item.slug || item.title)
    },
    [onChange],
  )

  return (
    <Wrapper $testid="tabs">
      {items.map((item) => (
        <TabItem
          key={isString(item) ? item : item.slug || item.title}
          $active={activeKey === item.slug}
          onClick={() => handleItemClick(item)}
        >
          {item.title}
        </TabItem>
      ))}
    </Wrapper>
  )
}

export default memo(Tabs)
