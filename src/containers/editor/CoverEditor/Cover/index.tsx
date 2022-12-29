import { FC } from 'react'
import { isEmpty } from 'ramda'

import { parseWallpaper } from '@/utils/wallpaper'

import type { TToolboxSetting } from '../spec'
import { IMAGE_POS } from '../constant'

import { Wrapper, GlassBorder, Image, Light } from '../styles/cover'
import Placeholder from './Placeholder'

type TProps = {
  setting: TToolboxSetting
  imageUrl: string
}

const Cover: FC<TProps> = ({ setting, imageUrl }) => {
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
          shadowLevel={setting.shadowLevel}
          borderRadiusLevel={setting.borderRadiusLevel}
          linearBorderPos={setting.linearBorderPos}
        >
          <Image
            src={imageUrl}
            pos={setting.pos}
            size={setting.size}
            ratio={setting.ratio}
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
