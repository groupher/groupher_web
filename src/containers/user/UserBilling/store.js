/*
 * UserBilling store
 *
 */

import { PAGE_SIZE } from '@/config'
import { T, getParent, markStates, toJS } from '@/mobx'
import { emptyPagi } from '@/model'

const Bill = T.model('Bill', {
  id: T.string,
  hashId: T.string,
  paymentMethod: T.string,
  paymentUsage: T.string,
  state: T.string,
  amount: T.number,
  note: T.opt(T.string, ''),
  insertedAt: T.opt(T.string, ''),
})

const PagedBillRecords = T.model('PagedBillRecords', {
  entries: T.opt(T.array(Bill), []),
  pageNumber: T.opt(T.number, 1),
  pageSize: T.opt(T.number, PAGE_SIZE.D),
  totalCount: T.opt(T.number, 0),
  totalPages: T.opt(T.number, 0),
})

const UserBilling = T.model('UserBilling', {
  pagedBillRecords: T.opt(PagedBillRecords, emptyPagi),
})
  .views((self) => ({
    get root() {
      return getParent(self)
    },
    get pagedBillRecordsData() {
      return toJS(self.pagedBillRecords)
    },
    get accountInfo() {
      return self.root.accountInfo
    },
    get isSelfViewing() {
      return self.root.viewing.isSelfViewing
    },
  }))
  .actions((self) => ({
    sponsorHepler() {
      self.root.sponsorHepler()
    },
    cashierHelper(opt) {
      self.root.cashierHelper(opt)
    },
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default UserBilling
