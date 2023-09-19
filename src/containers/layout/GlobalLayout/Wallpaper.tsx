import { FC } from 'react'
import { observer } from 'mobx-react'

import useWallpaper from '@/hooks/useWallpaper'
import { parseWallpaper } from '@/utils/wallpaper'

import { Wrapper } from './styles/wallpaper'

const Wallpaper: FC = () => {
  const theWallpaper = useWallpaper()
  console.log('## theWallpaper: ', theWallpaper)

  const { wallpapers, wallpaper, customWallpaper } = theWallpaper
  const { background, effect } = parseWallpaper(wallpapers, wallpaper, customWallpaper)

  // for custom image/svg
  // for use style object not passing props
  // @link see https://github.com/styled-components/styled-components/issues/3315#issuecomment-885977691
  return <Wrapper style={{ background }} effect={effect} />
}

export default observer(Wallpaper)
