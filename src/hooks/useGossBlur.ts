import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useGossBlur = (): number => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { dashboardThread } = store

  return dashboardThread.gossBlur
}

export default useGossBlur
