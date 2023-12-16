import THEME from '@/constant/theme'

// top: [15, 30]
// means top: hovering is 15, idle is 30

export const CARDS_METRICS = {
  [THEME.DAY]: {
    [THEME.DAY]: {
      width: [112, 112],
      height: [132, 132],
    },
    [THEME.NIGHT]: {
      width: [112, 112],
      height: [132, 132],
    },
  },
  [THEME.NIGHT]: {
    [THEME.DAY]: {
      width: [132, 130],
      height: [132, 160],
    },
    [THEME.NIGHT]: {
      width: [120, 120],
      height: [160, 132],
    },
  },
}

export const holder = 1
