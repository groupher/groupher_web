import { useContext } from 'react'
import { equals, any, has, omit, findIndex, update, includes, forEach, clone } from 'ramda'

import type { TEditValue, TTag, TNameAlias } from '@/spec'
import { toJS, runInAction } from '@/mobx'
import { isObject } from '@/validator'
import { StoreContext } from '@/stores2'
import BStore from '@/utils/bstore'
import { toast } from '@/signal'

import {
  DASHBOARD_DEMO_KEY,
  SETTING_FIELD,
  BASEINFO_KEYS,
  SEO_KEYS,
} from '@/stores2/dashboardStore/constant'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useMutationAPI from '../useMutationAPI'

export type TRet = {
  edit: (value: TEditValue, field: TSettingField) => void
  rollbackEdit: (field: TSettingField) => void
  resetEdit: (field: TSettingField) => void
  onSave: (field: TSettingField) => Promise<void>
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useUtils = (): TRet => {
  const { dashboard: store } = useContext(StoreContext)
  const { mutation } = useMutationAPI()

  const edit = (v: TEditValue, field: TSettingField): void => {
    let value = v
    if (isObject(v) && has('target', v)) {
      // @ts-ignore
      value = v.target.value
    }

    store.mark({ [field]: value })
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

  const _findTagIdx = (): number => {
    const self = store

    const { tags, editingTag } = self
    const targetIdx = findIndex((item: TTag) => item.id === editingTag.id, toJS(tags))
    return targetIdx
  }

  const _findAliasIdx = (): number => {
    const self = store

    const { nameAlias, editingAlias } = self
    const targetIdx = findIndex(
      (item: TNameAlias) => item.slug === editingAlias.slug,
      toJS(nameAlias),
    )

    return targetIdx
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
      const targetIdx = _findTagIdx()
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
      const targetIdx = _findAliasIdx()
      if (targetIdx < 0) return

      self.nameAlias[targetIdx] = toJS(self.nameAlias[targetIdx])
      self.editingAlias = null
      return
    }

    const initValue = toJS(self.initSettings[field])

    self[field] = initValue
  }

  // save to local settings should omit subTabs,
  // otherwise it will be choas when save one one tab then switch to other tab
  const _saveToLocal = (): void => {
    const self = store

    const saveSlf = omit(
      ['curTab', 'baseInfoTab', 'aliasTab', 'layoutTab', 'layoutTab', 'broadcastTab'],
      toJS(self),
    )

    BStore.set(DASHBOARD_DEMO_KEY, JSON.stringify(saveSlf))
  }

  const resetEdit = (field: TSettingField): void => {
    const self = store

    if (field === SETTING_FIELD.NAME_ALIAS) {
      const targetIdx = _findAliasIdx()
      if (targetIdx < 0) return

      self.nameAlias[targetIdx].name = self.nameAlias[targetIdx].original
      self.editingAlias = null
    }

    _saveToLocal()
    // slf.mark({ demoAlertEnable: true })
  }

  const _updateEditingTag = () => {
    const { editingTag, tags } = store

    const _editingTag = toJS(editingTag)
    const _tags = toJS(tags)
    const _initSettings = toJS(store.initSettings)

    const targetIndex = findIndex((item: TTag) => item.id === editingTag.id, _tags)
    const updatedTags = update(targetIndex, _editingTag, _tags)

    const initSettings = { ..._initSettings, tags: updatedTags }
    store.initSettings = initSettings
  }

  const _doSave = (field: TSettingField): void => {
    if (field === SETTING_FIELD.TAG) {
      const { editingTag } = store
      const targetIdx = _findTagIdx()
      if (targetIdx < 0) return

      store.tags[targetIdx] = toJS(editingTag)
      _updateEditingTag()
    }

    if (field === SETTING_FIELD.NAME_ALIAS) {
      const { editingAlias } = store

      const targetIdx = _findAliasIdx()
      if (targetIdx < 0) return

      store.nameAlias[targetIdx] = clone(editingAlias)
    }
  }

  const onSave = async (field: TSettingField): Promise<void> => {
    runInAction(() => {
      store.saving = true
      store.savingField = field
      _doSave(field)
    })

    console.log('## on save: ', field)

    mutation(field, store[field])
  }

  return {
    edit,
    rollbackEdit,
    resetEdit,
    onSave,
  }
}

export default useUtils
