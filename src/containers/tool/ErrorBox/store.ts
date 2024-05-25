/*
 * ErrorBox store
 *
 */

import type { TGQError } from '@/spec'
import ERR from '@/const/err'
import { T, markStates, Instance, toJS, useMobxContext } from '@/mobx'

const Message = T.model('Message', {
  message: T.string,
  key: T.opt(T.string, ''),
  path: T.opt(T.string, ''),
  code: T.opt(T.number, 0),
})

const ErrorBox = T.model('ErrorBox', {
  show: T.opt(T.bool, false),
  type: T.opt(T.enum('type', [ERR.GRAPHQL, ERR.NETWORK, ERR.TIMEOUT]), ERR.GRAPHQL),
  operation: T.opt(T.string, '--'),
  path: T.maybeNull(T.string),

  timeoutError: T.opt(T.string, '--'),
  // spec type of ERR.GRAPHQL
  graphqlType: T.opt(T.enum('graphqlType', ['changeset', 'parse', 'custom']), 'changeset'),
  customError: T.maybeNull(T.array(Message)),
  parseError: T.maybeNull(T.array(Message)),
  changesetError: T.maybeNull(T.array(Message)),
})
  .views((self) => ({
    get changesetErrorData(): TGQError[] {
      return toJS(self.changesetError)
    },
    get customErrorData(): TGQError[] {
      return toJS(self.customError)
    },
    get parseErrorData(): TGQError[] {
      return toJS(self.parseError)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ErrorBox>
export const useStore = (): TStore => useMobxContext().store.errorBox

export default ErrorBox
