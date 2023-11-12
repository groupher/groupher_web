/*
 *
 * Route
 *
 */

import { useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'

import { useStore } from './store'
import { useInit } from './logic'

const Route = () => {
  const store = useStore()
  const router = useRouter()
  useInit(store, router)

  return <div />
}

export default observer(Route)
