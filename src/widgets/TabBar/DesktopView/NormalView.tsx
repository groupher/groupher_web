import { memo } from 'react'

import { sortByIndex } from '@/utils/helper'
import Tabs from '@/widgets/Switcher/Tabs'

// priority: icon > localIcon || slug
// const getLocalIcon = (item) => {
//   if (item.icon) return ''

//   return item.localIcon ? item.localIcon : item.slug
// }

const NormalView = ({ layout, source, active, onChange, size }) => {
  const items = source.map((item) => ({
    ...item,
    // localIcon: getLocalIcon(item),
  }))

  return (
    <Tabs
      layout={layout}
      items={sortByIndex(items)}
      activeKey={active}
      onChange={onChange}
      size={size}
      noAnimation
    />
  )
}

export default memo(NormalView)
