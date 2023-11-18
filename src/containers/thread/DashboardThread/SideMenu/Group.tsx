import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import type { TDashboardPath } from '@/spec'
import { DASHBOARD_ROUTE } from '@/constant/route'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import useViewingCommunity from '@/hooks/useViewingCommunity'

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
}

const Group: FC<TProps> = ({ group, curTab, touched }) => {
  const community = useViewingCommunity()
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
                $color={primaryColor}
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
