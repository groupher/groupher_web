import type { TEditFunc, TNameAlias } from '~/spec'
import useDsbEdit from '~/stores/dsbEdit/hooks'
import { useAliasEditorUi } from '~/stores/dsbEditorUi/hooks'

import { FIELD } from '../constant'
import useHelper from './useHelper'

type TRet = {
  saving: boolean
  nameAlias: readonly TNameAlias[]
  editingAlias: TNameAlias

  updateEditingAlias: (alias: TNameAlias) => void
  edit: TEditFunc
  resetEdit: () => void
}

/** Exposes alias state and actions through the shared React hook boundary. */
export default function useAlias(): TRet {
  const dsb$ = useDsbEdit()
  const aliasUi$ = useAliasEditorUi()
  const { edit, resetEdit, isPending } = useHelper()

  const { editingAlias } = aliasUi$
  const { nameAlias } = dsb$

  const updateEditingAlias = (alias: TNameAlias): void => {
    aliasUi$.patch({ editingAlias: alias })
  }

  return {
    editingAlias,
    nameAlias,
    saving: isPending,
    edit,
    updateEditingAlias,
    resetEdit: () => resetEdit(FIELD.NAME_ALIAS),
  }
}
