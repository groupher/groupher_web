import type { TThemeMap } from '@/spec'

import useStoreTree from '@/hooks/useStoreTree'

/**
 * NOTE: should use observer to wrap the component who use this hook
 * this hook is ONLY used for init ThemePalette, cuz the useTheme from
 * styled-component can only be used before it init
 */
const useThemeData = (): TThemeMap => {
  const store = useStoreTree('theme')

  return store.themeData
}

export default useThemeData
