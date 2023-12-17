import { FC, memo } from 'react'

import FakeBrowser from './FakeBrowser'

import type { TSetupDomainStatus, TCommunityType } from '../spec'
import { STEP } from '../constant'
import { Wrapper } from '../styles/content/setup_domain'

type TProps = {
  status: TSetupDomainStatus
  communityType: TCommunityType
}

const SetupDomain: FC<TProps> = ({ status, communityType }) => {
  const { slug } = status

  return (
    <Wrapper>
      <FakeBrowser domain={slug} step={STEP.SETUP_DOMAIN} communityType={communityType} />
    </Wrapper>
  )
}

export default memo(SetupDomain)
