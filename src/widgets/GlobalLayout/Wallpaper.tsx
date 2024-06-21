'use client'

import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useTheme from '@/hooks/useTheme'
import useWallpaper from '@/hooks/useWallpaper'

import { Wrapper } from './styles/wallpaper'

const Wallpaper: FC = () => {
  const { theme } = useTheme()

  const { background, effect } = useWallpaper()

  // for use style object not passing props
  // @link see https://github.com/styled-components/styled-components/issues/3315#issuecomment-885977691
  return <Wrapper style={{ background }} $effect={effect} $theme={theme} />
}

export default observer(Wallpaper)
