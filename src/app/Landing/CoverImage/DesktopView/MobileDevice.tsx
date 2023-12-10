import { FC } from 'react'

import useWallpaper from '@/hooks/useWallpaper'
import { parseWallpaper } from '@/wallpaper'

import {
  Wrapper,
  Content,
  Image,
  Background,
  Bar,
} from '../../styles/cover_image/desktop_view/mobile_device'

const MobileDevice: FC = () => {
  const { wallpapers, wallpaper } = useWallpaper()
  const { background, effect } = parseWallpaper(wallpapers, wallpaper)

  const imageSrc = '/landing/intro/mobile.png'

  return (
    <Wrapper>
      <Bar />
      <Content>
        <Image src={imageSrc} noLazy />
        <Background style={{ background }} effect={effect} />
      </Content>
    </Wrapper>
  )
}

export default MobileDevice
