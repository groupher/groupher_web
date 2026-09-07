import type { TEditFunc } from '~/spec'
import useDsbEdit from '~/stores/dsbEdit/hooks'

import { FIELD } from '../constant'
import useHelper from './useHelper'

type TRet = {
  overlayDark: boolean
  saving: boolean
  isTouched: boolean
  edit: TEditFunc
}

/** Exposes overlay dark state and actions through the shared React hook boundary. */
export default function useOverlayDark(): TRet {
  const dsb$ = useDsbEdit()
  const { edit, isChanged, isPending } = useHelper()

  const { overlayDark } = dsb$

  return {
    overlayDark,
    saving: isPending,
    edit,
    isTouched: isChanged(FIELD.OVERLAY_DARK),
  }
}
