/*
 * AbuseReport store
 */

import { find, propEq } from 'ramda'

import { REPORT_TYPE } from '@/constant/report'

import type { TCommunity, TArticle, TRootStore } from '@/spec'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'
import { buildLog } from '@/logger'

import type { TREPORT_ITEM } from './spec'
/* eslint-disable-next-line */
const log = buildLog('S:AbuseReport')

const initItem = {
  title: '',
  slug: '',
  checked: false,
  info: '',
  detail: '',
}

const Item = T.model('AbuseReport', {
  title: T.string,
  slug: T.string,
  checked: T.opt(T.bool, false),
  info: T.opt(T.string, ''),
  detail: T.opt(T.string, ''),
})

const AbuseReport = T.model('AbuseReport', {
  show: T.opt(T.bool, false),
  type: T.opt(T.string, REPORT_TYPE.ARTICLE),
  items: T.maybeNull(T.array(Item)),
  checkedItemRaw: T.maybeNull(T.string),
  view: T.opt(T.enum(['main', 'detail']), 'main'),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get itemsData(): TREPORT_ITEM[] {
      return toJS(self.items || [])
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return root.viewingArticle
    },
    get activeItem(): TREPORT_ITEM {
      const { itemsData, checkedItemRaw } = self as TStore
      const findItem = find(propEq(checkedItemRaw, 'slug'), itemsData) as TREPORT_ITEM

      return findItem || initItem
    },
  }))
  .actions((self) => ({
    reset(): void {
      self.show = false
      self.view = 'main'
      self.checkedItemRaw = null
      self.items = null
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof AbuseReport>
export const useStore = (): TStore => useMobxContext().store.abuseReport

export default AbuseReport
