/*
 *
 * Tabs
 *
 */

import { type FC, useCallback, memo } from 'react'

import type { TTabItem } from '~/spec'
import { isString } from '~/validator'

import useSalon, { cn } from '../styles/tabs/drawer_view'

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
}

const Tabs: FC<TProps> = ({ onChange = console.log, items = temItems, activeKey = '' }) => {
  const s = useSalon()

  const handleItemClick = useCallback(
    (item) => {
      onChange(isString(item) ? item : item.slug || item.title)
    },
    [onChange],
  )

  return (
    <div className={s.wrapper} data-testid="tabs">
      {items.map((item) => (
        <div
          key={isString(item) ? item : item.slug || item.title}
          className={cn(s.tabItem, activeKey === item.slug && s.tabItemActive)}
          onClick={() => handleItemClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}

export default memo(Tabs)
