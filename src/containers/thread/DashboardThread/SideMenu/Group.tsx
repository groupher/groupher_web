import { FC, useState } from 'react'
import { observer } from 'mobx-react'

import type { TCommunity, TDashboardPath } from '@/spec'
import { DASHBOARD_ROUTE } from '@/constant/route'
import usePrimaryColor from '@/hooks/usePrimaryColor'

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
  const primaryColor = usePrimaryColor()
  const [fold, setFold] = useState(group.initFold)

  return (
    <Wrapper>
      <Folder onClick={() => setFold(!fold)}>
        <IconWrapper>{group.icon}</IconWrapper>
        <Title>{group.title}</Title>
        <FoldArrowIcon fold={fold} />
      </Folder>

      {!fold && (
        <MenuWrapper>
          {group.children.map((item) => {
            const subPath = item.slug === DASHBOARD_ROUTE.DASHBOARD ? '' : item.slug

            return (
              <Item
                key={item.slug}
                $active={item.slug === curTab}
                href={`/${community.slug}/${DASHBOARD_ROUTE.DASHBOARD}/${subPath}`}
                primaryColor={primaryColor}
              >
                {item.title}
                {touched && (touched[item.slug] || touched[item.alias]) && <TouchedDot />}
              </Item>
            )
          })}
        </MenuWrapper>
      )}
    </Wrapper>
  )
}

export default observer(Group)
