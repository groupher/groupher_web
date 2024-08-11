'use client'

import { fmt2CompStyle } from '~/fmt'
import useWallpaper from '~/hooks/useWallpaper'

import useSalon from './salon/wallpaper'

export default () => {
  const s = useSalon()

  const { background, effect } = useWallpaper()

  return <div className={s.wrapper} style={{ background, ...fmt2CompStyle(effect) }} />
  // for use style object not passing props
  // @link see https://github.com/styled-components/styled-components/issues/3315#issuecomment-885977691
  // return <Wrapper style={{ background }} $effect={effect} $theme={theme} />
}
