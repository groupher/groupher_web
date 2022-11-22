/*
 * Subscriber store
 */

import { types as T, getParent, Instance } from 'mobx-state-tree'
import { values } from 'ramda'

import type { TCommunity, TRootStore } from '@/spec'
import { buildLog } from '@/utils/logger'
import { markStates, toJS } from '@/utils/mobx'

import { BY } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:Subscriber')

const Subscriber = T.model('Subscriber', {
  visible: T.optional(T.boolean, false),
  by: T.optional(T.enumeration(values(BY)), BY.EMAIL),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
  }))
  .actions((self) => ({
    toggleSubscriber(visible?: boolean | undefined): void {
      if (visible === undefined) {
        self.visible = true
        return
      }

      self.visible = visible
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof Subscriber>

export default Subscriber
