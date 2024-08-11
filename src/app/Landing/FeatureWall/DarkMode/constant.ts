import THEME from '~/const/theme'

// top: [15, 30]
// means top: hovering is 15, idle is 30

export const CARDS_METRICS = {
  [THEME.LIGHT]: {
    [THEME.LIGHT]: {
      width: [112, 112],
      height: [132, 132],
    },
    [THEME.DARK]: {
      width: [112, 112],
      height: [132, 132],
    },
  },
  [THEME.DARK]: {
    [THEME.LIGHT]: {
      width: [132, 130],
      height: [132, 160],
    },
    [THEME.DARK]: {
      width: [120, 120],
      height: [160, 132],
    },
  },
}

export const holder = 1
