import { FC, memo } from 'react'

import type { TWallpaperInfo } from '@/spec'
import { parseWallpaper } from '@/utils/wallpaper'

import { Wrapper } from './styles/wallpaper'

type TProps = {
  wallpaperInfo: TWallpaperInfo
}

const Wallpaper: FC<TProps> = ({ wallpaperInfo }) => {
  const { wallpapers, wallpaper, customWallpaper } = wallpaperInfo
  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)

  // for custom image/svg
  // for use style object not passing props
  // @link see https://github.com/styled-components/styled-components/issues/3315#issuecomment-885977691
  return <Wrapper style={{ background }} effect={effect} />
}

export default memo(Wallpaper)
