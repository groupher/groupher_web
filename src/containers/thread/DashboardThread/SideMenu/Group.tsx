import { FC, memo, useState } from 'react'

import type { TCommunity, TDashboardPath } from '@/spec'
import { DASHBOARD_ROUTE } from '@/constant/route'

import type { TMenuGroup, TTouched } from '../spec'

import {
  Wrapper,
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
  community: TCommunity
}

const Group: FC<TProps> = ({ group, curTab, touched, community }) => {
  const [fold, setFold] = useState(false)

  return (
    <Wrapper>
      <Folder onClick={() => setFold(!fold)}>
        <IconWrapper>{group.icon}</IconWrapper>
        <Title>{group.title}</Title>
        <FoldArrowIcon fold={fold} />
      </Folder>

      {!fold && (
        <MenuWrapper>
          {group.children.map((item) => (
            <Item
              $active={item.raw === curTab}
              key={item.raw}
              href={`/${community.raw}/${DASHBOARD_ROUTE.DASHBOARD}/${item.raw}`}
            >
              {item.title}
              {touched && (touched[item.raw] || touched[item.alias]) && <TouchedDot />}
            </Item>
          ))}
        </MenuWrapper>
      )}
    </Wrapper>
  )
}

export default memo(Group)
