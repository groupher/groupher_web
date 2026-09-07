import { findIndex, has, update } from 'ramda'
import { useCallback } from 'react'

import useDsbFieldSave from '~/query/mutation/useDsbFieldSave'
import type { TEditFunc, TEditValue, TNameAlias } from '~/spec'
import useDsbEdit from '~/stores/dsbEdit/hooks'
import { useAliasEditorUi, useTagEditorUi } from '~/stores/dsbEditorUi/hooks'
import { isObject } from '~/validator'

import { BASEINFO_KEYS, FAQ_STORE_FIELDS, FIELD, SEO_KEYS, TAG_STORE_FIELDS } from '../../constant'
import type { TDsbEditableFieldKey, TDsbFieldKey } from '../../spec'

const NAME_ALIAS_FIELD = FIELD.NAME_ALIAS

export type TRet = {
  edit: TEditFunc
  rollbackEdit: (field: TDsbFieldKey) => void
  resetEdit: (field: TDsbFieldKey) => void
  onSave: (field: TDsbFieldKey) => void
  isPending: boolean
  error: Error | null
}

/** Exposes edit state and actions through the shared React hook boundary. */
export default function useEdit(): TRet {
  const dsb$ = useDsbEdit()
  const aliasUi$ = useAliasEditorUi()
  const tagUi$ = useTagEditorUi()
  const { mutation, isPending, error } = useDsbFieldSave()

  const edit = useCallback(
    (v: TEditValue, field: TDsbFieldKey): void => {
      let value = v
      if (isObject(v) && has('target', v)) {
        value = (v as { target: { value: TEditValue } }).target.value
      }

      dsb$.edit(field as TDsbEditableFieldKey, value as never)
    },
    [dsb$.edit],
  )

  const _findAliasIdx = (): number => {
    const { nameAlias } = dsb$
    const { editingAlias } = aliasUi$
    if (!editingAlias) return -1
    const targetIdx = findIndex((item: TNameAlias) => item.slug === editingAlias.slug, nameAlias)

    return targetIdx
  }

  const rollbackEdit = (field: TDsbFieldKey): void => {
    if (field === FIELD.BASE_INFO) {
      dsb$.rollback(BASEINFO_KEYS)
      return
    }

    if (field === FIELD.SEO) {
      dsb$.rollback(SEO_KEYS)
      return
    }

    if (field === FIELD.TAG) {
      tagUi$.patch({ editingTag: null })
      return
    }

    if (field === FIELD.TAG_INDEX) {
      dsb$.rollback(TAG_STORE_FIELDS)
      return
    }

    if (field === FIELD.DOC_FAQ) {
      dsb$.rollback(FAQ_STORE_FIELDS)
      return
    }

    if (field === FIELD.NAME_ALIAS) {
      const targetIdx = _findAliasIdx()
      if (targetIdx < 0) return

      const updatedNameAlias = update(targetIdx, dsb$.original.nameAlias[targetIdx], dsb$.nameAlias)
      dsb$.edit(NAME_ALIAS_FIELD, updatedNameAlias)
      aliasUi$.patch({ editingAlias: null })
      return
    }

    dsb$.rollback([field as TDsbEditableFieldKey])
  }

  const resetEdit = (field: TDsbFieldKey): void => {
    if (field === FIELD.NAME_ALIAS) {
      const targetIdx = _findAliasIdx()
      if (targetIdx < 0) return

      // self.nameAlias[targetIdx].name = self.nameAlias[targetIdx].original
      // self.editingAlias = null
      aliasUi$.patch({ editingAlias: null })
    }

    // _saveToLocal()
    // slf.mark({ demoAlertEnable: true })
  }

  const onSave = (field: TDsbFieldKey): void => {
    console.log('## on save: ', field)
    mutation(field)
  }

  return {
    edit,
    rollbackEdit,
    resetEdit,
    onSave,
    isPending,
    error,
  }
}
