import useTouch, { type TRet as TTouch } from './useTouch'
import useEdit, { type TRet as TEdit } from './useEdit'

type TRet = TTouch & TEdit

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHelper = (): TRet => {
  const { isChanged, anyChanged, mapArrayChanged } = useTouch()
  const { edit, rollbackEdit, resetEdit, onSave } = useEdit()

  return {
    isChanged,
    anyChanged,
    mapArrayChanged,
    edit,
    rollbackEdit,
    resetEdit,
    onSave,
  }
}

export default useHelper
