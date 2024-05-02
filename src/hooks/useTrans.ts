import { useContext, useCallback, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TLocale, TTransKey } from '@/spec'
// import { MobXProviderContext } from 'mobx-react'

type TRet = {
  t: (key: TTransKey) => string
  locale: TLocale
}
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTrans = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  const localeJson = useMemo(() => JSON.parse(store.localeData), [store.localeData])

  const t = useCallback(
    (key: TTransKey): string => {
      return localeJson?.[key] || '--'
    },
    [store.localeData],
  )

  return { t, locale: store.locale }
}

export default useTrans
