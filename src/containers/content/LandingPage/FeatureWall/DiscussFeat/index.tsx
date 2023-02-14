import { FC, useEffect, useState } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'
import IntroItems from './IntroItems'

import { Wrapper } from '../../styles/feature_wall/discuss_feat'

const DiscussFeat: FC = () => {
  const [inView, setInView] = useState(false)

  const { isMobile } = useMobileDetect()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper $active={inView}>
      <IntroDigest
        inViewChange={(cur) => {
          setInView(cur)
        }}
      />
      <IntroImage $active={inView} />
      {loaded && isMobile && <IntroItems />}
    </Wrapper>
  )
}

export default DiscussFeat
