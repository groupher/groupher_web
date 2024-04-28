import { useContext, useCallback } from 'react'
import { MobXProviderContext } from 'mobx-react'

// import { localeJson } from './useLoadI18n'
// import useLoadI18n from './useLoadI18n'
import useI18nParser from './useI18nParser'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTrans = () => {
  const { store } = useContext(MobXProviderContext)
  // const { localeJson } = useLoadI18n()
  const { parse } = useI18nParser()
  // const [locale, setLocale] = useState({})

  const t = useCallback(
    (key: string): string => {
      console.log('## current locale: ')
      // console.log('## return ', localeJson?.[key])

      // return localeJson?.[key] || '--'
      return parse(key)
      // return localeJson?.[key] || '--'
    },
    [store.locale],
  )

  // useEffect(() => {
  //   setLocale(BStore.get(`locale.${store.locale}`))
  // }, [store.locale])

  return { t }
}

export default useTrans
