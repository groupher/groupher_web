import { FC, Fragment } from 'react'
import { keys, startsWith } from 'ramda'

import type { TLinkItem } from '@/spec'
import { MORE_GROUP, ONE_LINK_GROUP } from '@/constant/dashboard'
import { sortByIndex, groupByKey } from '@/utils/helper'

import Tooltip from '@/widgets/Tooltip'

import type { TProps, TLinkGroup } from './spec'

import { Wrapper, LinkItem, GroupItem, ArrowIcon, MenuPanel } from './styles/simple_layout'

const LinkGroup: FC<TLinkGroup> = ({ groupKey, links, showMoreFold }) => {
  if (!showMoreFold) return null

  return (
    <Tooltip
      content={
        <MenuPanel>
          {links.map((item: TLinkItem) => (
            <LinkItem key={item.index} href={item.link}>
              {item.title}
            </LinkItem>
          ))}
        </MenuPanel>
      }
      placement="bottom"
      offset={[-5, 5]}
    >
      <GroupItem as="div">
        {groupKey === MORE_GROUP ? '更多' : groupKey} <ArrowIcon />
      </GroupItem>
    </Tooltip>
  )
}

const ExtraLinks: FC<TProps> = ({ links }) => {
  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      {groupKeys.map((groupKey: string) => {
        const curGroupLinks = groupedLinks[groupKey]

        if (curGroupLinks.length === 1 && curGroupLinks[0].title === '') return null

        return (
          <Fragment key={groupKey}>
            {startsWith(ONE_LINK_GROUP, groupKey) ? (
              <LinkItem href={curGroupLinks[0].link}>{curGroupLinks[0].title}</LinkItem>
            ) : (
              <LinkGroup
                groupKey={groupKey}
                links={curGroupLinks}
                showMoreFold={links.length >= 2 && links[0].title !== ''}
              />
            )}
          </Fragment>
        )
      })}
    </Wrapper>
  )
}

export default ExtraLinks
