import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TLocale } from '@/spec'
import { loadLocaleFile } from '@/i18n'

type TRet = {
  changeLocale: (locale: TLocale) => void
  locale: TLocale
}
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useChangeI18n = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  const changeLocale = (locale: TLocale) => {
    loadLocaleFile(locale)
      .then((localeData) => {
        store.setLocaleData(JSON.stringify(localeData))
        store.setLocale(locale)
      })
      .catch((error) => {
        console.log(`## Failed to load locale file: ${error}`)
      })
  }

  return {
    locale: store.locale,
    changeLocale,
  }
}

export default useChangeI18n
