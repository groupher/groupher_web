import type { FC } from 'react'
import { isEmpty } from 'ramda'

import { parseWallpaper } from '~/wallpaper'

import { IMAGE_POS } from '../constant'
import Placeholder from './Placeholder'

import useLogic from '../useLogic'
import { Wrapper, GlassBorder, Image, Light } from '../styles/cover'

type TProps = {
  imageUrl: string
}

const Cover: FC<TProps> = ({ imageUrl }) => {
  const { toolboxSetting: setting } = useLogic()

  const hasImage = !isEmpty(imageUrl)

  if (!hasImage) {
    return <Placeholder />
  }

  return (
    <Wrapper
      hasImage={hasImage}
      background={parseWallpaper(setting.wallpapers, setting.wallpaper).background}
    >
      {hasImage && (
        <GlassBorder
          hasGlassBorder={setting.hasGlassBorder}
          pos={setting.pos}
          size={setting.size}
          ratio={setting.ratio}
          rotate={setting.rotate}
          shadowLevel={setting.shadowLevel}
          borderRadiusLevel={setting.borderRadiusLevel}
          linearBorderPos={setting.linearBorderPos}
        >
          <Image
            src={imageUrl}
            pos={setting.pos}
            size={setting.size}
            ratio={setting.ratio}
            rotate={setting.rotate}
            shadowLevel={setting.shadowLevel}
            borderRadiusLevel={setting.borderRadiusLevel}
            linearBorderPos={setting.linearBorderPos}
            noLazy
          />
          {setting.lightPos !== IMAGE_POS.NONE && <Light pos={setting.lightPos} />}
        </GlassBorder>
      )}
    </Wrapper>
  )
}

export default Cover
