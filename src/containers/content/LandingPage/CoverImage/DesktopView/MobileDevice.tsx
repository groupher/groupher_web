import { FC } from 'react'

import { parseWallpaper } from '@/utils/wallpaper'

import {
  Wrapper,
  Content,
  Image,
  Background,
  Bar,
} from '../../styles/cover_image/desktop_view/mobile_device'

import type { TProps } from '..'

const MobileDevice: FC<TProps> = ({ wallpaperInfo }) => {
  const { wallpapers, wallpaper } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper)

  const imageSrc = '/intro/mobile.png'

  return (
    <Wrapper>
      <Bar />
      <Content>
        <Image src={imageSrc} />
        <Background style={{ background }} effect={effect} />
      </Content>
    </Wrapper>
  )
}

export default MobileDevice
