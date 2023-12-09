import THEME from '@/constant/theme'

// top: [15, 30]
// means top: hovering is 15, idle is 30

export const CARDS_METRICS = {
  [THEME.DAY]: {
    [THEME.DAY]: {
      top: [15, 30],
      left: [110, 25],
      width: [130, 132],
      height: [160, 132],
      zIndex: [1, 3],
      opacity: [1, 1],
    },
    [THEME.NIGHT]: {
      top: [30, 18],
      left: [30, 100],
      width: [120, 120],
      height: [132, 160],
      zIndex: [3, 1],
      opacity: [1, 0.9],
    },
  },
  [THEME.NIGHT]: {
    [THEME.DAY]: {
      top: [30, 15],
      left: [30, 100],
      width: [132, 130],
      height: [132, 160],
      zIndex: [3, 1],
      opacity: [1, 0.8],
    },
    [THEME.NIGHT]: {
      top: [18, 30],
      left: [105, 25],
      width: [120, 120],
      height: [160, 132],
      zIndex: [1, 3],
      opacity: [1, 1],
    },
  },
}

export const holder = 1
