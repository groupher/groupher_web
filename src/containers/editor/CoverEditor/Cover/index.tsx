import { FC } from 'react'
import { isEmpty } from 'ramda'

import { parseWallpaper } from '@/utils/wallpaper'

import type { TToolboxSetting } from '../spec'

import { Wrapper, GlassBorder, Image } from '../styles/cover'
import Placeholder from './Placeholder'

type TProps = {
  setting: TToolboxSetting
  imageUrl: string
}

const Cover: FC<TProps> = ({ setting, imageUrl }) => {
  const hasImage = !isEmpty(imageUrl)
  const hasGlassBorder = false

  if (!hasImage) {
    return <Placeholder />
  }

  return (
    <Wrapper
      hasImage={hasImage}
      background={parseWallpaper(setting.wallpapers, setting.wallpaper).background}
    >
      {hasImage && hasGlassBorder && (
        <GlassBorder
          pos={setting.pos}
          shadowLevel={setting.shadowLevel}
          borderRadiusLevel={setting.borderRadiusLevel}
          linearBorderPos={setting.linearBorderPos}
        >
          <Image
            src={imageUrl}
            // pos={{ left: 0, top: 0 }}
            shadowLevel={setting.shadowLevel}
            borderRadiusLevel={setting.borderRadiusLevel}
            linearBorderPos={setting.linearBorderPos}
            noLazy
          />
        </GlassBorder>
      )}

      {hasImage && !hasGlassBorder && (
        <Image
          src={imageUrl}
          pos={setting.pos}
          size={setting.size}
          shadowLevel={setting.shadowLevel}
          borderRadiusLevel={setting.borderRadiusLevel}
          linearBorderPos={setting.linearBorderPos}
          noLazy
        />
      )}
    </Wrapper>
  )
}

export default Cover
