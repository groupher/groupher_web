import { FIELDS } from '~/constant/dsb-fields'

import type { TDsbEditStore } from './spec'

export const DSB_EDIT_ACTION_KEYS = [
  'edit',
  'editMany',
  'rollback',
  'accept',
  'reconcile',
  'reconcileConfirmed',
  'isTouched',
  'anyTouched',
] as const satisfies readonly (keyof TDsbEditStore)[]

export const DSB_EDIT_STATE_KEYS = [
  ...(Object.keys(FIELDS) as Array<keyof typeof FIELDS>),
  'original',
  'touchedFields',
] as const satisfies readonly (keyof TDsbEditStore)[]
