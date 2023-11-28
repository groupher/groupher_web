import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import useWindowResize from '@/hooks/useWindowResize'
import { WIDTH } from '@/css/metric'

import useMetric from './useMetric'

type TRes = {
  rightOffset: string
  fromContentEdge: boolean
}
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useDrawerOffset = (): TRes => {
  const { store } = useContext(MobXProviderContext)
  const metric = useMetric()
  const { width: windowWidth } = useWindowResize()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const MAX_WIDTH = Number(WIDTH[metric].PAGE.slice(0, -2))

  return {
    rightOffset: `${windowWidth <= MAX_WIDTH ? '0' : (windowWidth - MAX_WIDTH) / 2}px`,
    fromContentEdge: windowWidth <= MAX_WIDTH,
  }
}

export default useDrawerOffset
