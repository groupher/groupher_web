import { useContext, useCallback, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'
// import { toUpper, toLower } from 'ramda'

import { titleCase } from '@/fmt'

import type { TLocale, TTransKey } from '@/spec'
// import { MobXProviderContext } from 'mobx-react'

type TFmt = 'titleCase' | null

type TRet = {
  t: (key: TTransKey, fmt?: TFmt) => string
  locale: TLocale
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTrans = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  const localeJson = useMemo(() => JSON.parse(store.localeData), [store.localeData])

  const t = useCallback(
    (key: TTransKey, fmt: TFmt = null): string => {
      const ret = localeJson?.[key] || '--'

      if (fmt === 'titleCase') {
        return titleCase(ret)
      }

      return ret
    },
    [store.localeData],
  )

  return { t, locale: store.locale }
}

export default useTrans
