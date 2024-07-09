import type { TThemeName } from '~/spec'

const THEME = {
  DAY: 'day',
  NIGHT: 'night',
} as Record<Uppercase<TThemeName>, TThemeName>

export default THEME
