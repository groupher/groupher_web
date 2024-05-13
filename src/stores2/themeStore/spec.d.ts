import type { TThemeMap, TThemeName } from '@/spec'

export type TThemeStore = {
  theme: TThemeName
  readonly themeData: TThemeMap
  // actions
  change: (theme: TThemeName) => void
  toggle: () => void
}
