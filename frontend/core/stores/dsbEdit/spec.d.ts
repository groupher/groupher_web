import type { TDsbEditableFieldKey, TDsbFieldMap } from '~/spec'

export type TDsbEditableFields = TDsbFieldMap

export type TDsbReconcileInput = {
  fields: readonly TDsbEditableFieldKey[]
  submitted: Partial<TDsbEditableFields>
  confirmed: Partial<TDsbEditableFields>
}

export type TDsbEditStore = TDsbEditableFields & {
  original: TDsbEditableFields
  touchedFields: Partial<Record<TDsbEditableFieldKey, true>>

  edit: <K extends TDsbEditableFieldKey>(field: K, value: TDsbEditableFields[K]) => void
  editMany: (patch: Partial<TDsbEditableFields>) => void
  rollback: (fields: readonly TDsbEditableFieldKey[]) => void
  accept: (fields: readonly TDsbEditableFieldKey[]) => void
  reconcile: (input: TDsbReconcileInput) => void
  reconcileConfirmed: (confirmed: TDsbEditableFields) => void
  isTouched: (field: TDsbEditableFieldKey) => boolean
  anyTouched: (fields: readonly TDsbEditableFieldKey[]) => boolean
}

export type TDsbEditContextValue = {
  editStore: TDsbEditStore
}
