import { keys, includes } from 'ramda'

import { GRADIENT_WALLPAPER, GRADIENT_WALLPAPER_NAME } from '@/constant/wallpaper'

export const getGlowBackground = (wallpaper: string): string => {
  if (!includes(wallpaper, keys(GRADIENT_WALLPAPER))) {
    return ''
  }

  // @ts-ignore
  const { colors } = GRADIENT_WALLPAPER[wallpaper]

  if (!colors) return ''

  const color1 = colors[0]
  const color2 = colors[colors.length - 1]

  return `radial-gradient(circle at 40% 90%, ${color1} 0, transparent 18%), 
          radial-gradient(circle at 58% 100%, ${color2} 0, transparent 30%)`
}

export const getGlowOpacity = (wallpaper: string): number => {
  switch (wallpaper) {
    case GRADIENT_WALLPAPER_NAME.GREEN: {
      return 0.4
    }

    case GRADIENT_WALLPAPER_NAME.ORANGE: {
      return 0.3
    }

    case GRADIENT_WALLPAPER_NAME.PURPLE: {
      return 0.5
    }

    case GRADIENT_WALLPAPER_NAME.BLUE: {
      return 0.4
    }

    default: {
      return 0.8
    }
  }
}

export const getBetaGradient = (wallpaper: string): string => {
  if (!includes(wallpaper, keys(GRADIENT_WALLPAPER))) {
    return '#f2bc5a,#f76b6b'
  }

  if (wallpaper === GRADIENT_WALLPAPER_NAME.PINK) {
    return '#f8be6d,#c479de'
  }

  // @ts-ignore
  const { colors } = GRADIENT_WALLPAPER[wallpaper]

  if (!colors) return ''

  const color1 = colors[0]
  const color2 = colors[colors.length - 1]

  return `${color1}, ${color2}`
}
