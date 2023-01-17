import { FC, memo, Fragment } from 'react'

import type { TDashboardPath } from '@/spec'
import type { TMenuGroup, TTouched } from '../spec'

import { Folder, Item, Title, TouchedDot } from '../styles/side_menu/group'

type TProps = {
  group: TMenuGroup
  curTab: TDashboardPath
  touched: TTouched
}

const Group: FC<TProps> = ({ group, curTab, touched }) => {
  return (
    <Fragment key={group.title}>
      <Folder>
        {group.icon}
        <Title>{group.title}</Title>
      </Folder>
      {group.children.map((item) => (
        <Item $active={item.raw === curTab} key={item.raw} href={`/home/dashboard/${item.raw}`}>
          {item.title}
          {touched[item.raw] && <TouchedDot />}
        </Item>
      ))}
    </Fragment>
  )
}

export default memo(Group)
