import type { TThemeName } from '~/spec'

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as Record<Uppercase<TThemeName>, TThemeName>

export default THEME
