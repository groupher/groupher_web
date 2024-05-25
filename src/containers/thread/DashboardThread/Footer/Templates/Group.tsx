import { FC } from 'react'
import { keys } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TActive, TLinkItem } from '@/spec'
import { FOOTER_LAYOUT } from '@/const/layout'
import { DEME_SOCIALS } from '@/const/social'

import { sortByIndex, groupByKey } from '@/helper'
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
} from '../../styles/footer/templates/group'
import { edit } from '../../logic'

type TProps = {
  links: TLinkItem[]
} & TActive

const Group: FC<TProps> = ({ links, $active }) => {
  const [animateRef] = useAutoAnimate()
  const [groupAnimateRef] = useAutoAnimate()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper $active={$active} onClick={() => edit(FOOTER_LAYOUT.GROUP, 'footerLayout')}>
      <LeftWrapper>
        <BrandWrapper>
          <BrandLogo />
          <BrandText>Groupher</BrandText>
        </BrandWrapper>
        <Desc>让你的产品听见用户的声音</Desc>
        <SocialList top={20} left={-5} size="tiny" selected={DEME_SOCIALS} />
      </LeftWrapper>

      <RightWrapper ref={groupAnimateRef}>
        {groupKeys.map((groupTitle: string) => {
          const curGroupLinks = groupedLinks[groupTitle]

          return (
            <CenterWrapper key={groupTitle} ref={animateRef}>
              <GroupTitle>{groupTitle}</GroupTitle>

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

export default Group
