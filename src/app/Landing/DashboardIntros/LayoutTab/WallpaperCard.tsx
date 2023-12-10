import { FC } from 'react'

import { parseWallpaper } from '@/wallpaper'
import useWallpaper from '@/hooks/useWallpaper'

import { Wrapper, Background } from '../../styles/dashboard_intros/layout_tab/wallpaper_card'

const WallpaperCard: FC = () => {
  const { wallpapers, wallpaper } = useWallpaper()
  const { background, effect } = parseWallpaper(wallpapers, wallpaper)

  return (
    <Wrapper>
      <Background style={{ background }} effect={effect} />
    </Wrapper>
  )
}

export default WallpaperCard
