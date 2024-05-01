import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import { useCallback } from 'react'
// import { MobXProviderContext } from 'mobx-react'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTrans = () => {
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

  return { t }
}

export default useTrans
