import { useContext } from 'react'
import { equals, any } from 'ramda'

import { toJS, runInAction } from '@/mobx'
import { StoreContext } from '@/stores2'

import { SETTING_FIELD, BASEINFO_KEYS, SEO_KEYS } from '@/stores2/dashboardStore/constant'

import type { TSettingField } from '../spec'

type TRet = {
  isChanged: (field: TSettingField) => boolean
  anyChanged: (fields: TSettingField[]) => boolean
  mapArrayChanged: (key: string) => boolean

  //
  rollbackEdit: (field: TSettingField) => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHelper = (): TRet => {
  const { dashboard: store } = useContext(StoreContext)
  const { initSettings } = store

  const isChanged = (field: TSettingField): boolean => {
    return !equals(store[field], initSettings[field])
  }

  const anyChanged = (fields: TSettingField[]): boolean => any(isChanged)(fields)

  const mapArrayChanged = (key: string): boolean => {
    return JSON.stringify(toJS(store[key])) !== JSON.stringify(toJS(initSettings[key]))
  }

  const _rollbackByKeys = (keys: string[]): void => {
    const self = store

    runInAction(() => {
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i]
        const initValue = self.initSettings[key]
        if (self[key] !== initValue) {
          self[key] = initValue
        }
      }
    })
  }

  const rollbackEdit = (field: TSettingField): void => {
    const self = store

    if (field === SETTING_FIELD.BASE_INFO) {
      _rollbackByKeys(BASEINFO_KEYS)
      return
    }

    if (field === SETTING_FIELD.SEO) {
      _rollbackByKeys(SEO_KEYS)
      return
    }

    if (field === SETTING_FIELD.TAG) {
      const targetIdx = self._findTagIdx()
      if (targetIdx < 0) return

      self.tags[targetIdx] = toJS(self.tags[targetIdx])
      self.editingTag = null
      return
    }

    if (field === SETTING_FIELD.TAG_INDEX) {
      self.tags = toJS(self.initSettings.tags)
      return
    }

    if (field === SETTING_FIELD.FAQ_SECTIONS) {
      self.faqSections = toJS(self.initSettings.faqSections)
      return
    }

    if (field === SETTING_FIELD.NAME_ALIAS) {
      const targetIdx = self._findAliasIdx()
      if (targetIdx < 0) return

      self.nameAlias[targetIdx] = toJS(self.nameAlias[targetIdx])
      self.editingAlias = null
      return
    }

    const initValue = toJS(self.initSettings[field])

    self[field] = initValue
  }

  // TODO: onSave
  // TODO: onReset

  return {
    isChanged,
    anyChanged,
    mapArrayChanged,
    rollbackEdit,
  }
}

export default useHelper
