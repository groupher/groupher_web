import type { TFlatThemeKey } from '~/utils/themes/skins'
import useTheme from '~/hooks/useTheme'

import THEME from '~/const/theme'

type TWColorPrefix = 'bg' | 'text' | 'border' | 'placeholder' | 'ring' | 'ring-offset'

type TRet = {
  theme: (key: TFlatThemeKey, prefix?: TWColorPrefix) => string
}

export default (): TRet => {
  const { theme: curTheme } = useTheme()
  /**
   * cover article.title -> article-title to match the tailwind csss varaible name
   */
  const theme = (key: TFlatThemeKey, prefix = 'bg') => {
    return curTheme === THEME.DAY
      ? `${prefix}-${key.replace(/\./g, '-')}`
      : `${prefix}-${key.replace(/\./g, '-')}-dark`
  }

  return {
    theme,
  }
}
