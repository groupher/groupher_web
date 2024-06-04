import { useContext } from 'react'
import { equals, any } from 'ramda'

import { toJS } from '@/mobx'
import { StoreContext } from '@/stores2'

import type { TSettingField } from '@/stores2/dashboardStore/spec'

export type TRet = {
  isChanged: (field: TSettingField) => boolean
  anyChanged: (fields: TSettingField[]) => boolean
  mapArrayChanged: (key: string) => boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTouch = (): TRet => {
  const { dashboard: store } = useContext(StoreContext)
  const { initSettings } = store

  const isChanged = (field: TSettingField): boolean => {
    return !equals(toJS(store[field]), toJS(initSettings[field]))
  }

  const anyChanged = (fields: TSettingField[]): boolean => any(isChanged)(fields)

  const mapArrayChanged = (key: string): boolean => {
    // return JSON.stringify(toJS(store[key])) !== JSON.stringify(toJS(initSettings[key]))
    return !equals(toJS(store[key]), toJS(initSettings[key]))
  }

  return {
    isChanged,
    anyChanged,
    mapArrayChanged,
  }
}

export default useTouch
