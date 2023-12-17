/*
 *
 * CommunityStatesPad
 *
 */

import { FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TCommunity } from '@/spec'
import { buildLog } from '@/logger'

// import Charger from '@/widgets/Charger'

import SubscribeStatus from './SubscribeStatus'
import ContentStatus from './ContentStatus'
import VolunteerStatus from './VolunteerStatus'

import {
  Wrapper,
  NumberSection,
  ContentSection,
  VolunteerSection,
  // ChargeSection,
  NumberDivider,
  NumberTitle,
} from './styles'

const _log = buildLog('w:CommunityStatesPad:index')

type TProps = {
  community: TCommunity
  realtimeVisitors?: number
  onShowEditorList?: () => void
  onShowSubscriberList?: () => void
}

const CommunityStatesPad: FC<TProps> = ({
  community,
  realtimeVisitors = 1,
  onShowEditorList = log,
  onShowSubscriberList = log,
}) => {
  const { isMobile } = useMobileDetect()

  const { moderatorsCount, subscribersCount, contributesDigest, articlesCount } = community

  return (
    <Wrapper>
      <NumberSection>
        {!isMobile && <NumberTitle>成员</NumberTitle>}

        <SubscribeStatus
          count={subscribersCount}
          subCount={realtimeVisitors}
          onClick={onShowSubscriberList}
        />
      </NumberSection>
      <NumberDivider />
      {!isMobile && (
        <ContentSection>
          <NumberTitle readOnly>内容</NumberTitle>
          <ContentStatus count={articlesCount} contributesDigest={contributesDigest} />
        </ContentSection>
      )}

      {!isMobile && <NumberDivider />}

      {!isMobile && (
        <VolunteerSection alignCenter={moderatorsCount < 99}>
          <NumberTitle readOnly>志愿者</NumberTitle>
          <VolunteerStatus count={moderatorsCount} onClick={onShowEditorList} />
        </VolunteerSection>
      )}

      {/* {!withoutFounding && (
        <>
          <NumberDivider />
          <ChargeSection>
            <NumberTitle>打赏</NumberTitle>
            <Charger />
          </ChargeSection>
        </>
      )} */}
    </Wrapper>
  )
}

export default memo(CommunityStatesPad)
