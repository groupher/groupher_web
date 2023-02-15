import { FC, useState } from 'react'

import { MobileOnly } from '@/widgets/Common'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'
import IntroItems from './IntroItems'

import { Wrapper } from '../../styles/feature_wall/discuss_feat'

const DiscussFeat: FC = () => {
  const [inView, setInView] = useState(false)

  return (
    <Wrapper $active={inView}>
      <IntroDigest
        inViewChange={(cur) => {
          setInView(cur)
        }}
      />
      <IntroImage $active={inView} />
      <MobileOnly>
        <IntroItems />
      </MobileOnly>
    </Wrapper>
  )
}

export default DiscussFeat
