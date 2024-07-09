import FakeBrowser from './FakeBrowser'

import { STEP } from '../constant'

import useLogic from '../useLogic'
import { Wrapper } from '../styles/content/setup_domain'

export default () => {
  const { slug, communityType } = useLogic()

  return (
    <Wrapper>
      <FakeBrowser domain={slug} step={STEP.SETUP_DOMAIN} communityType={communityType} />
    </Wrapper>
  )
}
