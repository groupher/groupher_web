import { FC } from 'react'
import { keys } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TActive, TLinkItem } from '@/spec'
import { FOOTER_LAYOUT } from '@/constant/layout'
import { DEME_SOCIALS } from '@/constant/social'

import { sortByIndex, groupByKey } from '@/utils/helper'
import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  LeftWrapper,
  RightWrapper,
  BrandWrapper,
  BrandLogo,
  BrandText,
  Desc,
  CenterWrapper,
  LinkItem,
  GroupTitle,
} from '../../styles/footer/templates/full'
import { edit } from '../../logic'

type TProps = {
  links: TLinkItem[]
} & TActive

const Full: FC<TProps> = ({ links, $active }) => {
  const [animateRef] = useAutoAnimate()
  const [groupAnimateRef] = useAutoAnimate()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper $active={$active} onClick={() => edit(FOOTER_LAYOUT.FULL, 'footerLayout')}>
      <LeftWrapper>
        <BrandWrapper>
          <BrandLogo />
          <BrandText>Groupher</BrandText>
        </BrandWrapper>
        <Desc>让你的产品聆听用户的声音</Desc>
        <SocialList top={20} left={-5} size="tiny" selected={DEME_SOCIALS} />
      </LeftWrapper>

      <RightWrapper ref={groupAnimateRef}>
        {groupKeys.map((groupKey: string) => {
          const curGroupLinks = groupedLinks[groupKey]

          return (
            <CenterWrapper key={groupKey} ref={animateRef}>
              <GroupTitle>{groupKey}</GroupTitle>

              {curGroupLinks.map((item) => (
                <LinkItem key={item.title} href={item.link}>
                  {item.title}
                </LinkItem>
              ))}
            </CenterWrapper>
          )
        })}
      </RightWrapper>
    </Wrapper>
  )
}

export default Full
