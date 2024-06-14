import { keys } from 'ramda'

import { DEME_SOCIALS } from '@/const/social'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useFooterLinks from '@/hooks/useFooterLinks'

import { assetSrc, sortByIndex, groupByKey } from '@/helper'

import { SpaceGrow } from '@/widgets/Common'
import SocialList from '@/widgets/SocialList'
import ImgFallback from '@/widgets/ImgFallback'

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

export default () => {
  const { logo, desc, title } = useViewingCommunity()
  const { links } = useFooterLinks()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <InnerWrapper>
        <BrandWrapper>
          <BrandLogo
            src={assetSrc(logo)}
            fallback={<ImgFallback size={25} left={-2} title={title} />}
            noLazy
          />
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
