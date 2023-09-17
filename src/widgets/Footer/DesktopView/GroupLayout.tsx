import { FC } from 'react'
import { observer } from 'mobx-react'
import { useTheme } from 'styled-components'
import { keys } from 'ramda'

import type { TThemeMap, TMetric, TLinkItem } from '@/spec'
import { DEME_SOCIALS } from '@/constant/social'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { sortByIndex, groupByKey } from '@/utils/helper'

import { SpaceGrow } from '@/widgets/Common'
import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  InnerWrapper,
  BrandWrapper,
  BrandLogo,
  BrandDesc,
  Column,
  Title,
  Body,
  LinkItem,
} from '../styles/desktop_view/group_layout'

type TProps = {
  metric: TMetric
  links: TLinkItem[]
}

const GroupLayout: FC<TProps> = ({ metric, links }) => {
  const theme = useTheme() as TThemeMap
  const curCommunity = useViewingCommunity()

  const linkColors = {
    color: theme.footer.text,
    hoverColor: theme.footer.hover,
  }

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <InnerWrapper metric={metric}>
        <BrandWrapper>
          <BrandLogo src={curCommunity.logo} />
          <BrandDesc>{curCommunity.desc}</BrandDesc>
          <SpaceGrow />

          <SocialList size="medium" selected={DEME_SOCIALS} top={10} />
        </BrandWrapper>

        {groupKeys.map((groupTitle: string) => {
          const curGroupLinks = groupedLinks[groupTitle]

          return (
            <Column key={groupTitle}>
              <Title>{groupTitle}</Title>
              <Body>
                {curGroupLinks.map((item) => (
                  <LinkItem key={item.index} href={item.link} {...linkColors}>
                    {item.title}
                  </LinkItem>
                ))}
              </Body>
            </Column>
          )
        })}
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(GroupLayout)
