import { useContext } from 'react'
import { equals } from 'ramda'
import { MobXProviderContext } from 'mobx-react'

import { toJS } from '@/mobx'

import type { TSettingField } from '../spec'

type TRet = {
  isChanged: (field: TSettingField) => boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHelper = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const _store = store.dashboardThread
  const { initSettings } = _store

  return {
    isChanged: (field: TSettingField): boolean =>
      !equals(toJS(_store[field]), toJS(initSettings[field])),
  }
}

export default useHelper
