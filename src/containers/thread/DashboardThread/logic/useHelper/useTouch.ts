import { equals, any } from 'ramda'

import useSubStore from '@/hooks/useSubStore'

import type { TSettingField } from '@/stores3/dashboard/spec'

export type TRet = {
  isChanged: (field: TSettingField) => boolean
  anyChanged: (fields: TSettingField[]) => boolean
  mapArrayChanged: (key: string) => boolean
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const { initSettings } = store

  const isChanged = (field: TSettingField): boolean => {
    return !equals(store[field], initSettings[field])
  }

  const anyChanged = (fields: TSettingField[]): boolean => any(isChanged)(fields)

  const mapArrayChanged = (key: string): boolean => {
    // return JSON.stringify(toJS(store[key])) !== JSON.stringify(toJS(initSettings[key]))
    return !equals(store[key], initSettings[key])
  }

  return {
    isChanged,
    anyChanged,
    mapArrayChanged,
  }
}
