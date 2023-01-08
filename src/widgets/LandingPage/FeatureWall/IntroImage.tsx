import { FC } from 'react'

import { Wrapper, Image, ColorBlock, ColorBlock2 } from '../styles/feature_wall/intro_image'

const IntroImage: FC = () => {
  return (
    <Wrapper>
      <Image src="/intro-help-demo.png" />
      <ColorBlock />
    </Wrapper>
  )
}

export default IntroImage
