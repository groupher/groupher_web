import { FC, useState } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'

import { sortByIndex } from '@/utils/helper'

import SocialEditor from '@/widgets/SocialEditor'

import { DEFAULT_LINK_ITEMS } from '../../constant'
import BrandInfo from './BrandInfo'
import LinkEditor from './LinkEditor'

import {
  Wrapper,
  Title,
  LeftWrapper,
  CenterWrapper,
  RightWrapper,
} from '../../styles/footer/editors/simple'

const Simple: FC = () => {
  const [links, setLinks] = useState(DEFAULT_LINK_ITEMS)

  const [parent] = useAutoAnimate({ duration: 220 })

  return (
    <Wrapper>
      <LeftWrapper>
        <BrandInfo />
      </LeftWrapper>
      <CenterWrapper ref={parent}>
        <Title>链接</Title>
        {sortByIndex(links).map((item) => (
          <LinkEditor key={item.index} linkItem={item as TLinkItem} />
        ))}
      </CenterWrapper>
      <RightWrapper>
        <Title>社交媒体</Title>
        <SocialEditor width="200px" withTitle={false} top={12} left={-5} />
      </RightWrapper>
    </Wrapper>
  )
}

export default Simple
