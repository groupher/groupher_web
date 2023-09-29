import { FC } from 'react'
import { observer } from 'mobx-react'

import useWallpaper from '@/hooks/useWallpaper'
import useTheme from '@/hooks/useTheme'

import { parseWallpaper } from '@/wallpaper'

import { Wrapper } from './styles/wallpaper'

const Wallpaper: FC = () => {
  const { wallpapers, wallpaper, customWallpaper } = useWallpaper()
  const themeName = useTheme()

  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)

  // for custom image/svg
  // for use style object not passing props
  // @link see https://github.com/styled-components/styled-components/issues/3315#issuecomment-885977691
  return <Wrapper style={{ background }} effect={effect} themeName={themeName} />
}

export default observer(Wallpaper)
