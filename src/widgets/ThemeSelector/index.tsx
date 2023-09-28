/*
 *
 * ThemeSelector
 *
 */

import { FC, memo } from 'react'

import type { TThemeName } from '@/spec'
import { buildLog } from '@/logger'

import DotSelector from './DotSelector'
import CardSelector from './CardSelector'
import GallerySelector from './GallerySelector'

/* eslint-disable-next-line */
const log = buildLog('w:ThemeSelector:index')

type TProps = {
  curTheme?: string
  displayStyle?: 'default' | 'card' | 'gallery'
  changeTheme?: (theme: string) => void
}

const ThemeSelector: FC<TProps> = ({ displayStyle, curTheme, changeTheme }) => {
  switch (displayStyle) {
    case 'card': {
      return <CardSelector curTheme={curTheme as TThemeName} changeTheme={changeTheme} />
    }
    case 'gallery': {
      return <GallerySelector curTheme={curTheme as TThemeName} changeTheme={changeTheme} />
    }
    default: {
      return <DotSelector curTheme={curTheme as TThemeName} changeTheme={changeTheme} />
    }
  }
}

export default memo(ThemeSelector)
