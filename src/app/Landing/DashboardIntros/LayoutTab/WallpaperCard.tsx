import useWallpaper from '~/hooks/useWallpaper'
import WallpaperBar from './WallpaperBar'

import {
  Wrapper,
  Background,
  EditToolbox,
} from '../../styles/dashboard_intros/layout_tab/wallpaper_card'

export default () => {
  const { background, effect } = useWallpaper()

  return (
    <Wrapper>
      <Background style={{ background }} effect={effect} />
      <EditToolbox>
        <WallpaperBar />
      </EditToolbox>
    </Wrapper>
  )
}
