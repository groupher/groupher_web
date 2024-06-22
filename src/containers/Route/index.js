/*
 *
 * Route
 */

import { useRouter } from 'next/navigation'

import { useStore } from './store'
import { useInit } from './logic'

export default () => {
  const store = useStore()
  const router = useRouter()
  useInit(store, router)

  return <div />
}
