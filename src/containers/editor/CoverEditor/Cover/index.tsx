import { FC } from 'react'
// import type { TImagePos } from '../spec'

import type { TToolboxSetting } from '../spec'
import { Wrapper, Image } from '../styles/cover'
import Placeholder from './Placeholder'

type TProps = {
  setting: TToolboxSetting
}

const Cover: FC<TProps> = ({ setting }) => {
  const imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/385126/600.jpg'

  return (
    <Wrapper>
      <Image src={imageUrl} noLazy pos={setting.pos} />
      {/* <Placeholder /> */}
    </Wrapper>
  )
}

export default Cover
