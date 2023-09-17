import { FC, Fragment, useState } from 'react'
import { observer } from 'mobx-react'
import { keys, startsWith, filter } from 'ramda'

import type { TLinkItem } from '@/spec'
import { MORE_GROUP, ONE_LINK_GROUP } from '@/constant/dashboard'
import { sortByIndex, groupByKey } from '@/utils/helper'
import useAccount from '@/hooks/useAccount'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import Tooltip from '@/widgets/Tooltip'

import type { TProps, TLinkGroup } from './spec'

import { Wrapper, LinkItem, GroupItem, ArrowIcon, MenuPanel } from './styles/simple_layout'

const LinkGroup: FC<TLinkGroup> = ({ groupTitle, links, showMoreFold, activePath }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { slug } = useViewingCommunity()

  if (!showMoreFold) return null

  return (
    <Tooltip
      content={
        <MenuPanel>
          {links.map((item: TLinkItem) => (
            <LinkItem
              key={item.index}
              href={item.link}
              $active={`/${slug}/${activePath}` === item.link}
            >
              {item.title}
            </LinkItem>
          ))}
        </MenuPanel>
      }
      onHide={() => setMenuOpen(false)}
      onShow={() => setMenuOpen(true)}
      trigger="click"
      placement="bottom"
      offset={[8, 5]}
    >
      {/* @ts-ignore */}
      <GroupItem as="div" $active={menuOpen}>
        {groupTitle === MORE_GROUP ? '更多' : groupTitle} <ArrowIcon />
      </GroupItem>
    </Tooltip>
  )
}

const ExtraLinks: FC<TProps> = ({ links, activePath = '' }) => {
  const { isModerator } = useAccount()

  const _links = filter((item) => item.title !== '', links)

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(_links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      {groupKeys.map((groupTitle: string) => {
        const curGroupLinks = groupedLinks[groupTitle]

        if (curGroupLinks.length === 1 && curGroupLinks[0].title === '') return null

        return (
          <Fragment key={groupTitle}>
            {startsWith(ONE_LINK_GROUP, groupTitle) ? (
              <LinkItem href={curGroupLinks[0].link}>{curGroupLinks[0].title}</LinkItem>
            ) : (
              <LinkGroup
                groupTitle={groupTitle}
                links={curGroupLinks}
                activePath={activePath}
                showMoreFold={(links.length >= 2 && links[0].title !== '') || isModerator}
              />
            )}
          </Fragment>
        )
      })}
    </Wrapper>
  )
}

export default observer(ExtraLinks)
