import { useContext, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'

const useI18nParser = () => {
  const { store } = useContext(MobXProviderContext)

  // 缓存解析过的 localeJson
  const localeJson = useMemo(() => {
    try {
      return JSON.parse(store.localeJson)
    } catch {
      console.error('## Error parsing store.localeJson')
      return {}
    }
  }, [store.localeJson])

  const parse = (key: string): string => {
    console.log('## parsing ', store.localeJson)

    return localeJson[key] || '--'
  }

  return { parse }
}

export default useI18nParser
