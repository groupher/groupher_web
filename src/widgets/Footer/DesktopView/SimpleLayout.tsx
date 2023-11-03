import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { keys } from 'ramda'

import type { TLinkItem } from '@/spec'
import useFooterLinks from '@/hooks/useFooterLinks'
import { DEME_SOCIALS } from '@/constant/social'

import { sortByIndex, groupByKey } from '@/helper'

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
  //
}

const SimpleLayout: FC<TProps> = () => {
  const { links } = useFooterLinks()

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

export default observer(SimpleLayout)
