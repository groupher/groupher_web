import { useContext, useCallback } from 'react'
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

  // const { store } = useContext(MobXProviderContext)
  // const { parse } = useI18nParser()

  const t = useCallback(
    (key: string): string => store.localeData?.[key] || '--',
    [store.localeData],
  )

  // useEffect(() => {
  //   setLocale(BStore.get(`locale.${store.locale}`))
  // }, [store.locale])

  return { t, locale: store.locale }
}

export default useTrans
