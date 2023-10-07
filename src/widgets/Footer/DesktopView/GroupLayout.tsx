import { FC } from 'react'
import { observer } from 'mobx-react'
import { keys } from 'ramda'

import { DEME_SOCIALS } from '@/constant/social'
import useTheme from '@/hooks/useTheme'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useFooterLinks from '@/hooks/useFooterLinks'

import { sortByIndex, groupByKey } from '@/helper'

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

const GroupLayout: FC = () => {
  const { themeMap } = useTheme()
  const curCommunity = useViewingCommunity()
  const { links } = useFooterLinks()

  const linkColors = {
    color: themeMap.footer.text,
    hoverColor: themeMap.footer.hover,
  }

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <InnerWrapper>
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
