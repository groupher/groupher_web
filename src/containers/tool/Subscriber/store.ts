/*
 * Subscriber store
 */

import { values } from 'ramda'

import type { TCommunity, TRootStore } from '@/spec'
import { buildLog } from '@/logger'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'

import { BY } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:Subscriber')

const Subscriber = T.model('Subscriber', {
  visible: T.opt(T.bool, false),
  by: T.opt(T.enum(values(BY)), BY.EMAIL),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
  }))
  .actions((self) => ({
    toggleVisible(visible?: boolean | undefined): void {
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
export const useStore = (): TStore => useMobxContext().store.subscriber

export default Subscriber
