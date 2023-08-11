import { FC, memo } from 'react'

import communityIntros from '../communityIntros'

import type { TStep, TCommunityType } from '../../spec'

import {
  Wrapper,
  BannerWrapper,
  IconBlock,
  AccountIcon,
  RealLogo,
  Intro,
  Title,
  Desc,
  TitleHolder,
  ThreadWrapper,
  ThreadItem,
  FeedWrapper,
  TagWrapper,
  Feed,
} from '../../styles/content/fake_browser/content'

type TProps = {
  step: TStep
  title?: string
  desc?: string
  logo?: string | null
  domain?: string | null
  communityType: TCommunityType
}

const Content: FC<TProps> = ({
  step,
  title = '',
  desc = '',
  logo,
  domain = null,
  communityType,
}) => {
  return (
    <Wrapper>
      <BannerWrapper>
        <Intro>
          {logo ? <RealLogo src={logo} /> : <IconBlock />}
          {title ? <Title>{title}</Title> : <TitleHolder>社区名称</TitleHolder>}
        </Intro>
        {communityType && (
          <ThreadWrapper>
            {communityIntros[communityType].threads.map((thread) => (
              <ThreadItem key={thread}>{thread}</ThreadItem>
            ))}
          </ThreadWrapper>
        )}
        <AccountIcon />
      </BannerWrapper>
      <Desc>{desc}</Desc>
      <TagWrapper hasDesc={!!desc}>
        <Feed width="50%" />
        <Feed width="30%" />
        <Feed width="6%" />
        <Feed width="50%" />
      </TagWrapper>
      <FeedWrapper>
        <Feed width="50%" />
        <Feed width="40%" />
        <Feed width="46%" />
        <Feed width="50%" />
        <Feed width="40%" />
        <Feed width="46%" />
        <Feed width="46%" />
        <Feed width="50%" />
      </FeedWrapper>
    </Wrapper>
  )
}

export default memo(Content)
