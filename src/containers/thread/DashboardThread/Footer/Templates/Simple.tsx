import { FC } from 'react'
import { keys } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TActive, TLinkItem } from '@/spec'
import { FOOTER_LAYOUT } from '@/constant/layout'
import { DEME_SOCIALS } from '@/constant/social'

import { sortByIndex, groupByKey } from '@/helper'
import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  LeftWrapper,
  BrandLogo,
  BrandText,
  CenterWrapper,
  LinkItem,
  RightWrapper,
} from '../../styles/footer/templates/simple'
import { edit } from '../../logic'

type TProps = {
  links: TLinkItem[]
} & TActive

const Simple: FC<TProps> = ({ links, $active }) => {
  const [animateRef] = useAutoAnimate()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper $active={$active} onClick={() => edit(FOOTER_LAYOUT.SIMPLE, 'footerLayout')}>
      <LeftWrapper>
        <BrandLogo />
        <BrandText>Groupher</BrandText>
      </LeftWrapper>

      <CenterWrapper ref={animateRef}>
        {groupedLinks[groupKeys[0]].map((item) => (
          <LinkItem key={item.title} href={item.link}>
            {item.title}
          </LinkItem>
        ))}
      </CenterWrapper>
      <RightWrapper>
        <SocialList top={0} size="tiny" selected={DEME_SOCIALS} />
      </RightWrapper>
    </Wrapper>
  )
}

export default Simple
