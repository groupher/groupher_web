import { FC, useState } from 'react'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'

import { Wrapper } from '../../styles/feature_wall/changelog_feat'

const ChangelogFeat: FC = () => {
  const [inView, setInView] = useState(false)

  return (
    <Wrapper $active={inView}>
      <IntroDigest inViewChange={(cur) => setInView(cur)} />
      <IntroImage $active={inView} />
    </Wrapper>
  )
}

export default ChangelogFeat
