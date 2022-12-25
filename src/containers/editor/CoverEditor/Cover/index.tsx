import { FC } from 'react'
import { isEmpty } from 'ramda'

import type { TToolboxSetting } from '../spec'

import { Wrapper, Image } from '../styles/cover'
import Placeholder from './Placeholder'

type TProps = {
  setting: TToolboxSetting
  imageUrl: string
}

const Cover: FC<TProps> = ({ setting, imageUrl }) => {
  const hasImage = !isEmpty(imageUrl)

  return (
    <Wrapper hasImage={hasImage}>
      {hasImage ? (
        <Image
          src={imageUrl}
          pos={setting.pos}
          shadowLevel={setting.shadowLevel}
          borderRadiusLevel={setting.borderRadiusLevel}
          noLazy
        />
      ) : (
        <Placeholder />
      )}
    </Wrapper>
  )
}

export default Cover
