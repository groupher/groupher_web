import { useContext, useState } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TLocale } from '@/spec'
import BStore from '@/utils/bstore'
import { LOCALE } from '@/constant/i18n'

// export let localeJson = {}

async function loadLocaleData(locale: TLocale) {
  switch (locale) {
    case LOCALE.ZH:
      return await import('@/i18n/zh.json')
    case LOCALE.EN:
      return await import('@/i18n/en.json')

    default:
      throw new Error(`Unsupported locale: ${locale}`)
  }
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useLoadI18n = () => {
  const { store } = useContext(MobXProviderContext)

  // const [localeJson, setLocaleJson] = useState({})
  const [error, setError] = useState(null)

  const loadLocale = async (locale: TLocale = LOCALE.EN) => {
    setError(null)

    try {
      const localeData = await loadLocaleData(locale)

      // @ts-ignore
      BStore.set(`locale.${locale}`, localeData.default as string)
      console.log('## seting localeJson: ', localeData.default)
      // localeJson = localeData.default
      // setLocaleJson(localeData.default)
      store.setLocale(locale)
      store.setLocaleJson(JSON.stringify(localeData.default))
    } catch (err) {
      setError(err)
      store.setLocale(LOCALE.EN)
    }
  }

  return { error, loadLocale }
}

export default useLoadI18n
