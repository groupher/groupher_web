import { FC, memo } from 'react'

import { Trans } from '@/i18n'

import communityIntros from '../communityIntros'
import type { TCommunityType } from '../../spec'

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
  title?: string
  desc?: string
  logo?: string | null
  communityType: TCommunityType
  onHoverThread: (thread: string) => void
}

const Content: FC<TProps> = ({ title = '', desc = '', logo, communityType, onHoverThread }) => {
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
              <ThreadItem key={thread} onMouseOver={() => onHoverThread(thread)}>
                {Trans(thread)}
              </ThreadItem>
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
