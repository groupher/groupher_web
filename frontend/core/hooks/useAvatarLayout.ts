import { AVATAR_LAYOUT } from '~/const/layout'
import useDsb from '~/query/useDsbConfig'
import type { TAvatarLayout } from '~/spec'

type TRet = {
  avatarLayout: TAvatarLayout
  isSquare: boolean
}

/** Exposes avatar layout state and actions through the shared React hook boundary. */
export default function useAvatarLayout(): TRet {
  const { avatarLayout } = useDsb()

  return {
    avatarLayout,
    isSquare: avatarLayout === AVATAR_LAYOUT.SQUARE,
  }
}
