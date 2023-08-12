import { FC, memo } from 'react'

import FakeBrowser from './FakeBrowser'

import type { TSetupInfoStatus, TCommunityType } from '../spec'
import { STEP } from '../constant'
import { Wrapper } from '../styles/content/setup_domain'

type TProps = {
  status: TSetupInfoStatus
  communityType: TCommunityType
}

const SetupExtra: FC<TProps> = ({ status, communityType }) => {
  const { slug, title, desc, logo } = status

  return (
    <Wrapper>
      <FakeBrowser
        domain={slug}
        communityType={communityType}
        title={title}
        desc={desc}
        logo={logo}
        step={STEP.SETUP_EXTRA}
      />
    </Wrapper>
  )
}

export default memo(SetupExtra)
