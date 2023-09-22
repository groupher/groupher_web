/*
 * SearchPanel store
 */

// import {} from 'ramda'

import type { TCommunity, TRootStore } from '@/spec'
import { buildLog } from '@/logger'
import { T, getParent, Instance, toJS, markStates } from '@/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:SearchPanel')

const SearchPanel = T.model('SearchPanel', {})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof SearchPanel>

export default SearchPanel
