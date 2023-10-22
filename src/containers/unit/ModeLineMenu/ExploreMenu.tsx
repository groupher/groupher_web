import { FC, memo } from 'react'
import Link from 'next/link'

import type { TCommunity } from '@/spec'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import {
  Wrapper,
  Header,
  Title,
  CommunityWrapper,
  CommunityCard,
  CommunityLogo,
  CommunityTitle,
} from './styles/explore_menu'

type TProps = {
  communities: TCommunity[]
  // community: TCommunity
}

const ExploreMenu: FC<TProps> = ({ communities }) => {
  return (
    <Wrapper>
      <Header>
        <Title>我加入的:</Title>
        <Link href="/">
          <ArrowButton>全部社区</ArrowButton>
        </Link>
      </Header>
      <CommunityWrapper>
        {communities.map((c, index) => (
          <Link key={c.slug} href={`/${c.slug}`}>
            <CommunityCard margin={index % 2 !== 0}>
              <CommunityLogo src={c.logo} />
              <CommunityTitle>{c.title}</CommunityTitle>
            </CommunityCard>
          </Link>
        ))}
      </CommunityWrapper>
    </Wrapper>
  )
}

export default memo(ExploreMenu)
