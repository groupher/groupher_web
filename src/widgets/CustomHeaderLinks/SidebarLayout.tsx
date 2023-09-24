import { FC, Fragment, useState } from 'react'
import { observer } from 'mobx-react'
import { keys, startsWith, filter } from 'ramda'

import type { TLinkItem } from '@/spec'
import { MORE_GROUP, ONE_LINK_GROUP } from '@/constant/dashboard'
import { sortByIndex, groupByKey } from '@/helper'
import useAccount from '@/hooks/useAccount'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import Tooltip from '@/widgets/Tooltip'
import { SpaceGrow } from '@/widgets/Common'

import type { TProps, TLinkGroup } from './spec'

import {
  Wrapper,
  MenuLinkItem,
  LinkItem,
  LinkIcon,
  GroupItem,
  ArrowIcon,
  MenuPanel,
  MoreIcon,
  ArrowUpRightIcon,
} from './styles/sidebar_layout'

const LinkGroup: FC<TLinkGroup> = ({ groupTitle, links, showMoreFold, activePath }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { slug } = useViewingCommunity()
  const primaryColor = usePrimaryColor()

  if (!showMoreFold) return null

  return (
    <Tooltip
      content={
        <MenuPanel>
          {links.map((item: TLinkItem) => (
            <MenuLinkItem
              key={item.index}
              href={item.link}
              $active={`/${slug}/${activePath}` === item.link}
              primaryColor={primaryColor}
            >
              {item.title}
            </MenuLinkItem>
          ))}
        </MenuPanel>
      }
      onHide={() => setMenuOpen(false)}
      onShow={() => setMenuOpen(true)}
      trigger="click"
      placement="bottom"
      offset={[-14, 5]}
    >
      {/* @ts-ignore */}
      <GroupItem as="div" $active={menuOpen} primaryColor={primaryColor}>
        <MoreIcon $active={menuOpen} primaryColor={primaryColor} />
        {groupTitle === MORE_GROUP ? '更多' : groupTitle} <ArrowIcon />
      </GroupItem>
    </Tooltip>
  )
}

const CustomHeaderLinks: FC<TProps> = ({ links, activePath = '' }) => {
  const { isModerator } = useAccount()
  const primaryColor = usePrimaryColor()

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
              <LinkItem href={curGroupLinks[0].link} primaryColor={primaryColor}>
                <LinkIcon primaryColor={primaryColor} />
                {curGroupLinks[0].title}
                <SpaceGrow />
                <ArrowUpRightIcon primaryColor={primaryColor} />
              </LinkItem>
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

export default observer(CustomHeaderLinks)
