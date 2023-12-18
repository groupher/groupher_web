import { FC, memo } from 'react'

import FakeBrowser from './FakeBrowser'

import type { TSetupInfoStatus } from '../spec'
import { STEP } from '../constant'
import { Wrapper } from '../styles/content/setup_domain'

type TProps = {
  status: TSetupInfoStatus
}

const SetupInfo: FC<TProps> = ({ status }) => {
  const { slug, title, desc, logo, communityType } = status

  return (
    <Wrapper>
      <FakeBrowser
        domain={slug}
        communityType={communityType}
        title={title}
        desc={desc}
        logo={logo}
        step={STEP.SETUP_INFO}
      />
    </Wrapper>
  )
}

export default memo(SetupInfo)
