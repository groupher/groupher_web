import useWallpaperValtio from '@/hooks/useWallpaperValtio'

import DesktopDevice from './DesktopDevice'
import DashboardDevice from './DashboardDevice'
import MobileDevice from './MobileDevice'

import { Wrapper, ParallaxWrapper, FreeLabel } from '../../styles/cover_image/desktop_view'

export default () => {
  const { wallpaper } = useWallpaperValtio()

  return (
    <Wrapper>
      <DesktopDevice />
      <FreeLabel wallpaper={wallpaper}>It's free !</FreeLabel>
      <ParallaxWrapper>
        <DashboardDevice />
        <MobileDevice />
      </ParallaxWrapper>
    </Wrapper>
  )
}
