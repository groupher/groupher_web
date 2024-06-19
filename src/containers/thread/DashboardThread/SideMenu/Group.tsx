import { type FC, useState } from 'react'

import { DASHBOARD_ROUTE } from '@/const/route'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import useDashboardTab from '@/hooks/useDashboardTab'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import type { TMenuGroup } from '../spec'

import {
  Wrapper,
  Folder,
  Item,
  FoldArrowIcon,
  Title,
  MenuWrapper,
  IconWrapper,
} from '../styles/side_menu/group'

type TProps = {
  group: TMenuGroup
}

const Group: FC<TProps> = ({ group }) => {
  const { curTab, changeTab } = useDashboardTab()
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
                onClick={() => changeTab(item.slug)}
                href={`/${community.slug}/${DASHBOARD_ROUTE.DASHBOARD}/${subPath}`}
                $color={primaryColor}
              >
                {item.title}
              </Item>
            )
          })}
        </MenuWrapper>
      )}
    </Wrapper>
  )
}

export default Group
