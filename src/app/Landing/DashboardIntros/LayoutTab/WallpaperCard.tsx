import useWallpaperValtio from '@/hooks/useWallpaperValtio'
import WallpaperBar from './WallpaperBar'

import {
  Wrapper,
  Background,
  EditToolbox,
} from '../../styles/dashboard_intros/layout_tab/wallpaper_card'

export default () => {
  const { background, effect } = useWallpaperValtio()

  return (
    <Wrapper>
      <Background style={{ background }} effect={effect} />
      <EditToolbox>
        <WallpaperBar />
      </EditToolbox>
    </Wrapper>
  )
}
