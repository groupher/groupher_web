import { FC, memo, Fragment, useState } from 'react'

import type { TDashboardPath } from '@/spec'
import type { TMenuGroup, TTouched } from '../spec'

import {
  Folder,
  Item,
  FoldArrowIcon,
  Title,
  MenuWrapper,
  TouchedDot,
  IconWrapper,
} from '../styles/side_menu/group'

type TProps = {
  group: TMenuGroup
  curTab: TDashboardPath | string
  touched: TTouched | null
}

const Group: FC<TProps> = ({ group, curTab, touched }) => {
  const [fold, setFold] = useState(false)

  return (
    <Fragment key={group.title}>
      <Folder onClick={() => setFold(!fold)}>
        <IconWrapper>{group.icon}</IconWrapper>
        <Title>{group.title}</Title>
        <FoldArrowIcon fold={fold} />
      </Folder>

      {!fold && (
        <MenuWrapper>
          {group.children.map((item) => (
            <Item $active={item.raw === curTab} key={item.raw} href={`/home/dashboard/${item.raw}`}>
              {item.title}
              {touched && touched[item.raw] && <TouchedDot />}
            </Item>
          ))}
        </MenuWrapper>
      )}
    </Fragment>
  )
}

export default memo(Group)
