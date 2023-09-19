import { FC, memo } from 'react'

import type { TCommunity, TEditMode } from '@/spec'
import { HCN } from '@/constant/name'

import { cutRest } from '@/fmt'
import { selectCommunity } from '@/signal'

import Tooltip from '@/widgets/Tooltip'
import CommunityCard from '@/widgets/Cards/CommunityCard'

import { Wrapper, BadgeWrapper, Logo, Intro, PubHint, Title, ChangeBtn, ArrowLogo } from './styles'

type TProps = {
  community: TCommunity
  mode?: TEditMode
}

const CommunityBadgeSelector: FC<TProps> = ({ community, mode = 'publish' }) => {
  const targetHint = community.slug === HCN ? '首页' : '子社区'

  return (
    <Wrapper>
      <BadgeWrapper>
        <Intro>
          {mode === 'publish' ? (
            <PubHint>发布到{targetHint}:</PubHint>
          ) : (
            <PubHint>所属社区:</PubHint>
          )}
          <Title>
            <Logo src={community.logo} slug={community.slug} />
            <Tooltip content={<CommunityCard item={community} />} delay={500} placement="bottom">
              <div>{cutRest(community.title || '--', 15)}</div>
            </Tooltip>
            {mode === 'publish' && (
              <ChangeBtn onClick={() => selectCommunity()}>
                更换 <ArrowLogo />
              </ChangeBtn>
            )}
          </Title>
        </Intro>
      </BadgeWrapper>
    </Wrapper>
  )
}

export default memo(CommunityBadgeSelector)
