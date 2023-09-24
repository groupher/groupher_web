import { FC, memo } from 'react'

import VIEW from '@/constant/view'
import { sortByIndex } from '@/helper'
import Tabs from '@/widgets/Switcher/Tabs'

import type { TProps } from '.'

const MobileView: FC<TProps> = ({ source, active, onChange, withIcon }) => {
  const items = source.map((item) => ({
    ...item,
    icon: withIcon ? item.slug : '',
  }))

  return (
    <Tabs items={sortByIndex(items)} activeKey={active} onChange={onChange} view={VIEW.MOBILE} />
  )
}

export default memo(MobileView)
