import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
type TRes = {
  show: boolean
  onClose: () => void
}

const useUserListModal = (): TRes => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    show: store.mushroom.showUserListModal,
    onClose: () => store.mushroom.closeUserListModal(),
  }
}

export default useUserListModal
