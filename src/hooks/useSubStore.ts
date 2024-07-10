import { useContext } from 'react'
import { useSnapshot } from 'valtio'

import { StoreContext } from '~/stores'
import type { TTreeStoreKey, TTreeStore, TRootStore } from '~/stores/spec'

const useStoreTree = <K extends TTreeStoreKey>(tree: K): TTreeStore<K> => {
  const root = useContext(StoreContext) as TRootStore
  const snap = useSnapshot(root)

  // @ts-ignore
  return snap[tree]
}

export default useStoreTree
