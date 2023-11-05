import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { keys } from 'ramda'

import { DEME_SOCIALS } from '@/constant/social'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useFooterLinks from '@/hooks/useFooterLinks'

import { assetSrc, sortByIndex, groupByKey } from '@/helper'

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
  const { logo, desc } = useViewingCommunity()
  const { links } = useFooterLinks()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <InnerWrapper>
        <BrandWrapper>
          <BrandLogo src={assetSrc(logo)} />
          <BrandDesc>{desc}</BrandDesc>
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
                  <LinkItem key={item.index} href={item.link}>
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
