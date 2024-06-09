import type { TLocale } from '@/spec'
import { loadLocaleFile } from '@/i18n'
import useStoreTree from '@/hooks/useStoreTree'

type TRet = {
  changeLocale: (locale: TLocale) => void
  locale: TLocale
}
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useChangeI18n = (): TRet => {
  const { locale, setLocale, setLocaleData } = useStoreTree('locale')

  const changeLocale = (locale: TLocale) => {
    loadLocaleFile(locale)
      .then((localeData) => {
        setLocaleData(JSON.stringify(localeData))
        setLocale(locale)
      })
      .catch((error) => {
        console.log(`## Failed to load locale file: ${error}`)
      })
  }

  return {
    locale,
    changeLocale,
  }
}

export default useChangeI18n
