/*
 * Cashier store
 *
 */

import { values } from 'ramda'

import type { TRootStore, TAccount } from '@/spec'

import { PAYMENT_USAGE, PAYMENT_METHOD } from '@/constant'
import { T, markStates, Instance, getParent } from '@/utils/mobx'

import { AMOUNT, SIDEBAR_VIEW, SUBCONTENT_VIEW } from './constant'

const Cashier = T.model('Cashier', {
  show: T.opt(T.bool, false),
  transferAccount: T.opt(T.string, ''),
  sidebarView: T.opt(T.enum('sideView', values(SIDEBAR_VIEW)), SIDEBAR_VIEW.PAY),
  contentView: T.opt(T.enum('contentView', values(SIDEBAR_VIEW)), SIDEBAR_VIEW.PAY),
  subContentView: T.opt(T.enum('subContentView', values(SUBCONTENT_VIEW)), SUBCONTENT_VIEW.PAY),
  paymentMethod: T.opt(T.enum('paymentMethod', values(PAYMENT_METHOD)), PAYMENT_METHOD.ALIPAY),
  paymentUsage: T.opt(T.enum('paymentUsage', values(PAYMENT_USAGE)), PAYMENT_USAGE.SENIOR),
  amount: T.opt(T.enum('amount', values(AMOUNT)), AMOUNT['10.24']),
})
  .views((self) => ({
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.accountInfo
    },
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
  }))
  .actions((self) => ({
    authWarning(options): void {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    callCashier({ paymentUsage, amount }): void {
      self.show = true
      self.paymentUsage = paymentUsage
      // @ts-ignore
      self.amount = String(amount)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof Cashier>
export default Cashier
