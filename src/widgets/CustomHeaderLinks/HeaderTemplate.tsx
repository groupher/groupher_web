import { FC, Fragment } from 'react'
import { observer } from 'mobx-react'
import { keys, startsWith } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'
import { MORE_GROUP, ONE_LINK_GROUP } from '@/constant/dashboard'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { sortByIndex, groupByKey } from '@/helper'

import Tooltip from '@/widgets/Tooltip'

import type { TProps, TLinkGroup } from './spec'

import { Wrapper, LinkItem, GroupItem, ArrowIcon, MenuPanel } from './styles/header_template'

const LinkGroup: FC<TLinkGroup> = ({ groupTitle, links, showMoreFold }) => {
  const primaryColor = usePrimaryColor()

  if (!showMoreFold) return null

  return (
    <Tooltip
      content={
        <MenuPanel>
          {links.map((item: TLinkItem) => (
            <LinkItem key={item.index} href={item.link} $color={primaryColor}>
              {item.title}
            </LinkItem>
          ))}
        </MenuPanel>
      }
      placement="bottom"
      offset={[-5, 5]}
    >
      {/* @ts-ignore */}
      <GroupItem as="div">
        {groupTitle === MORE_GROUP ? '更多' : groupTitle} <ArrowIcon />
      </GroupItem>
    </Tooltip>
  )
}

const CustomHeaderLinks: FC<TProps> = ({ links }) => {
  const primaryColor = usePrimaryColor()
  const [animateRef] = useAutoAnimate()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper ref={animateRef}>
      {groupKeys.map((groupTitle: string) => {
        const curGroupLinks = groupedLinks[groupTitle]

        if (curGroupLinks.length === 1 && curGroupLinks[0].title === '') return null

        return (
          <Fragment key={groupTitle}>
            {startsWith(ONE_LINK_GROUP, groupTitle) ? (
              <LinkItem href={curGroupLinks[0].link} $color={primaryColor}>
                {curGroupLinks[0].title}
              </LinkItem>
            ) : (
              <LinkGroup
                groupTitle={groupTitle}
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

export default observer(CustomHeaderLinks)
