import type DayTheme from '~/utils/themes/skins/day'

export type TThemeName = 'day' | 'night'

// export type TTheme = ((obj: any) => unknown) | string
export type TTheme = string
// export type TTheme = string

export type TThemeMap = typeof DayTheme
