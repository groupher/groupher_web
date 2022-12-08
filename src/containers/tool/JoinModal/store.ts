/*
 * JoinModal store
 *
 */

import { T, markStates, Instance } from '@/utils/mobx'

const JoinModal = T.model('JoinModal', {
  show: T.opt(T.bool, false),
  activeGroup: T.opt(T.string, 'IN'),
}).actions((self) => ({
  mark(sobj) {
    markStates(sobj, self)
  },
}))

export type TStore = Instance<typeof JoinModal>
export default JoinModal
