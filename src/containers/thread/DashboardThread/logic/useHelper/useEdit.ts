import { has, omit, findIndex, update } from 'ramda'

import type { TEditValue, TTag, TNameAlias } from '@/spec'
import { toJS, runInAction } from '@/mobx'
import { isObject } from '@/validator'
import useSubStore from '@/hooks/useSubStore'
import BStore from '@/utils/bstore'

import {
  DASHBOARD_DEMO_KEY,
  SETTING_FIELD,
  BASEINFO_KEYS,
  SEO_KEYS,
} from '@/stores2/dashboardStore/constant'

import type { TSettingField } from '@/stores3/dashboard/spec'
import useMutation from '../useMutation'

export type TRet = {
  edit: (value: TEditValue, field: TSettingField) => void
  rollbackEdit: (field: TSettingField) => void
  resetEdit: (field: TSettingField) => void
  onSave: (field: TSettingField) => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useUtils = (): TRet => {
  const store = useSubStore('dashboard')
  const { mutation } = useMutation()

  const edit = (v: TEditValue, field: TSettingField): void => {
    let value = v
    if (isObject(v) && has('target', v)) {
      // @ts-ignore
      value = v.target.value
    }

    store.commit({ [field]: value })
  }

  const _rollbackByKeys = (keys: string[]): void => {
    runInAction(() => {
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i]
        const initValue = store.initSettings[key]
        if (store[key] !== initValue) {
          store.commit({ [key]: initValue })
        }
      }
    })
  }

  const _findTagIdx = (): number => {
    const { tags, editingTag } = store
    const targetIdx = findIndex((item: TTag) => item.id === editingTag.id, toJS(tags))
    return targetIdx
  }

  const _findAliasIdx = (): number => {
    const { nameAlias, editingAlias } = store
    const targetIdx = findIndex(
      (item: TNameAlias) => item.slug === editingAlias.slug,
      toJS(nameAlias),
    )

    return targetIdx
  }

  const rollbackEdit = (field: TSettingField): void => {
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

      store.tags[targetIdx] = toJS(store.tags[targetIdx])
      store.commit({ editingTag: null })
      return
    }

    if (field === SETTING_FIELD.TAG_INDEX) {
      store.commit({ tags: store.initSettings.tags })
      return
    }

    if (field === SETTING_FIELD.FAQ_SECTIONS) {
      store.commit({ faqSections: store.initSettings.faqSections })
      return
    }

    if (field === SETTING_FIELD.NAME_ALIAS) {
      const targetIdx = _findAliasIdx()
      if (targetIdx < 0) return

      const updatedNameAlias = update(
        targetIdx,
        store.initSettings.nameAlias[targetIdx],
        store.nameAlias,
      )
      store.commit({ editingAlias: null, nameAlias: updatedNameAlias })
      return
    }

    store.commit({ [field]: store.initFilled[field] })
  }

  // save to local settings should omit subTabs,
  // otherwise it will be choas when save one one tab then switch to other tab
  const _saveToLocal = (): void => {
    const saveSlf = omit(
      ['curTab', 'baseInfoTab', 'aliasTab', 'layoutTab', 'layoutTab', 'broadcastTab'],
      toJS(store),
    )

    BStore.set(DASHBOARD_DEMO_KEY, JSON.stringify(saveSlf))
  }

  const resetEdit = (field: TSettingField): void => {
    if (field === SETTING_FIELD.NAME_ALIAS) {
      const targetIdx = _findAliasIdx()
      if (targetIdx < 0) return

      // self.nameAlias[targetIdx].name = self.nameAlias[targetIdx].original
      // self.editingAlias = null
      store.commit({ editingAlias: null })
    }

    _saveToLocal()
    // slf.mark({ demoAlertEnable: true })
  }

  const _updateEditingTag = () => {
    const { editingTag, tags } = store

    const targetIndex = findIndex((item: TTag) => item.id === editingTag.id, tags)
    const updatedTags = update(targetIndex, editingTag, tags)

    const initSettings = { ...store.initSettings, tags: updatedTags }
    store.commit({ initSettings })
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

      const updatedNameAlias = update(targetIdx, editingAlias, store.nameAlias)
      store.commit({ nameAlias: updatedNameAlias })
      // store.nameAlias[targetIdx] = clone(editingAlias)
    }
  }

  const onSave = (field: TSettingField): void => {
    console.log('## on save: ', field)
    store.commit({ saving: true, savingField: field })

    _doSave(field)
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
