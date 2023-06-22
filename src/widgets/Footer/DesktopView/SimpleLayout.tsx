import { FC } from 'react'
import { keys } from 'ramda'

import type { TLinkItem } from '@/spec'

import { DEME_SOCIALS } from '@/constant/social'

import { sortByIndex, groupByKey } from '@/utils/helper'

import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  BrandInfo,
  BrandText,
  LinksInfo,
  LinkItem,
  SocialInfo,
} from '../styles/desktop_view/simple_layout'

type TProps = {
  links: TLinkItem[]
}

const SimpleLayout: FC<TProps> = ({ links }) => {
  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <BrandInfo>
        <BrandText href="/">Groupher</BrandText>
      </BrandInfo>
      <LinksInfo>
        {groupedLinks[groupKeys[0]].map((item: TLinkItem) => (
          <LinkItem key={item.index} href={item.link}>
            {item.title}
          </LinkItem>
        ))}
      </LinksInfo>
      <SocialInfo>
        <SocialList selected={DEME_SOCIALS} />
      </SocialInfo>
    </Wrapper>
  )
}

export default SimpleLayout
