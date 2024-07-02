import FakeBrowser from './FakeBrowser'

import { STEP } from '../constant'
import useLogic from '../useLogic'
import { Wrapper } from '../styles/content/setup_domain'

export default () => {
  const { slug, title, desc, logo, communityType } = useLogic()

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
