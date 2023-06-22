import { FC } from 'react'
import { keys, startsWith } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { MORE_GROUP, ONE_LINK_GROUP } from '@/constant/dashboard'

import { sortByIndex, groupByKey } from '@/utils/helper'
import Tooltip from '@/widgets/Tooltip'

import type { TLinkItem } from '@/spec'

import {
  Wrapper,
  ColumnWrapper,
  LinkItemWrapper,
  GroupItem,
  ArrowIcon,
  MenuPanel,
} from './styles/header_template'

type TProps = {
  links: TLinkItem[]
}

type TLinkGroup = {
  groupKey: string
  links: TLinkItem[]
  showMoreFold: boolean
}

const LinkGroup: FC<TLinkGroup> = ({ groupKey, links, showMoreFold }) => {
  if (!showMoreFold) return null

  return (
    <Tooltip
      content={
        <MenuPanel>
          {links.map((item: TLinkItem) => (
            <LinkItemWrapper key={item.index}>{item.title}</LinkItemWrapper>
          ))}
        </MenuPanel>
      }
      placement="bottom"
      offset={[-5, 5]}
    >
      <GroupItem>
        {groupKey === MORE_GROUP ? '更多' : groupKey} <ArrowIcon />
      </GroupItem>
    </Tooltip>
  )
}

const ExtraLinks: FC<TProps> = ({ links }) => {
  const [parent] = useAutoAnimate()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper ref={parent}>
      {groupKeys.map((groupKey: string) => {
        const curGroupLinks = groupedLinks[groupKey]

        if (curGroupLinks.length === 1 && curGroupLinks[0].title === '') return null

        return (
          <ColumnWrapper key={groupKey}>
            {startsWith(ONE_LINK_GROUP, groupKey) ? (
              <LinkItemWrapper>{curGroupLinks[0].title}</LinkItemWrapper>
            ) : (
              <LinkGroup
                groupKey={groupKey}
                links={curGroupLinks}
                showMoreFold={links.length >= 2 && links[0].title !== ''}
              />
            )}
          </ColumnWrapper>
        )
      })}
    </Wrapper>
  )
}

export default ExtraLinks
