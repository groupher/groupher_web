/*
 * RichEditor store
 *
 */

import { T, Instance, markStates, useMobxContext } from '@/mobx'

const RichEditor = T.model('RichEditor', {})
  .views(() => ({}))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof RichEditor>
export const useStore = (): TStore => useMobxContext().store.richEditor

export default RichEditor
