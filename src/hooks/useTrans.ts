import { useContext, useCallback, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TLocale } from '@/spec'
// import { MobXProviderContext } from 'mobx-react'

type TRet = {
  t: (key: string) => string
  locale: TLocale
}
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTrans = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  const localeJason = useMemo(() => JSON.parse(store.localeData), [store.localeData])

  console.log('## got localeJason: ', localeJason)
  const t = useCallback(
    (key: string): string => {
      return localeJason?.[key] || '--'
    },
    [store.locale],
  )

  return { t, locale: store.locale }
}

export default useTrans
