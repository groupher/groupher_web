import { type FC, memo } from 'react'

import type { TTabItem } from '~/spec'
import { sortByIndex } from '~/helper'
import Tabs from '~/widgets/Switcher/Tabs'

import { Wrapper } from '../styles/desktop_view/brief_view'
// import TabIcon from './TabIcon'

type TProps = {
  source: TTabItem[]
  active: string
  onChange?: () => void
}

const BriefView: FC<TProps> = ({ source, active, onChange }) => {
  const items = source.map((item) => ({ ...item, localIcon: item.slug }))

  return (
    <Wrapper>
      <Tabs items={sortByIndex(items)} activeKey={active} onChange={onChange} size="small" />
    </Wrapper>
  )
}

export default memo(BriefView)
