import { FC, useState } from 'react'

import { MobileOnly } from '@/widgets/Common'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'
import IntroItems from './IntroItems'

import { Wrapper } from '../../styles/articles_intro_tabs/changelog_feat'

const ChangelogFeat: FC = () => {
  const [inView, setInView] = useState(false)

  return (
    <Wrapper $active={inView}>
      <IntroDigest inViewChange={(cur) => setInView(cur)} />
      <IntroImage $active={inView} />

      <MobileOnly>
        <IntroItems />
      </MobileOnly>
    </Wrapper>
  )
}

export default ChangelogFeat
