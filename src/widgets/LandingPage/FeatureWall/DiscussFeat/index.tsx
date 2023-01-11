import { FC, useState } from 'react'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'

import { Wrapper } from '../../styles/feature_wall/discuss_feat'

type TProps = {
  inViewOnChange: (inview: boolean) => void
}

const DiscussFeat: FC<TProps> = ({ inViewOnChange }) => {
  const [inView, setInView] = useState(false)

  return (
    <Wrapper $active={inView}>
      <IntroDigest
        inViewChange={(cur) => {
          inViewOnChange(cur)
          setInView(cur)
        }}
      />
      <IntroImage $active={inView} />
    </Wrapper>
  )
}

export default DiscussFeat
