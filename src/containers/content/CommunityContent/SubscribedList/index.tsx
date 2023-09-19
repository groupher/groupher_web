/*
 * User subscribed communities list
 */

import { FC, memo, Fragment, useState } from 'react'

import type { TCommunity } from '@/spec'
import { ICON } from '@/config'
import { HCN } from '@/constant/name'

import { changeToCommunity } from '@/utils/signal'
import { buildLog } from '@/logger'

import DotDivider from '@/widgets/DotDivider'
import Tooltip from '@/widgets/Tooltip'
import { Br, SpaceGrow } from '@/widgets/Common'

import ItemMenu from './ItemMenu'
import ExpandButton from './ExpandButton'

import {
  Wrapper,
  Item,
  ActiveDot,
  Logo,
  Title,
  HeadTitle,
  HeadNum,
  Option,
  OptionIcon,
} from '../styles/subscribed_list'

/* eslint-disable-next-line */
const log = buildLog('C:CommunityContent')

type TProps = {
  communities: TCommunity[]
  community: TCommunity
}

const SubscribedList: FC<TProps> = ({ community, communities }) => {
  const [expand, setExpand] = useState(false)
  const activeCommunity = community

  return (
    <Wrapper>
      <Br top={6} />
      <HeadTitle>
        <span>我的关注</span> <DotDivider radius={3} space={7} />
        <HeadNum>{communities.length}</HeadNum>
      </HeadTitle>
      <Br top={24} />
      <Item onClick={() => changeToCommunity(HCN)}>
        <Logo src={`${ICON}/shape/home.svg`} />
        首页
      </Item>
      {communities.slice(0, 15).map((community) => (
        <Fragment key={community.id}>
          <Item>
            {community.slug === activeCommunity.slug && <ActiveDot />}

            <Logo src={community.logo} />
            <Title
              $active={community.slug === activeCommunity.slug}
              onClick={() => changeToCommunity(community.slug)}
            >
              {community.title}
            </Title>
            <SpaceGrow />
            <Tooltip
              content={<ItemMenu community={community} />}
              placement="bottom"
              hideOnClick={false}
              trigger="click"
              noPadding
            >
              <Option>
                <OptionIcon src={`${ICON}/shape/more.svg`} />
              </Option>
            </Tooltip>
          </Item>
        </Fragment>
      ))}
      <ExpandButton isExpanded={expand} onClick={() => setExpand(!expand)} />
    </Wrapper>
  )
}

export default memo(SubscribedList)
