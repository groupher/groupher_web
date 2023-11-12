/*
 * CollectionFolder store
 *
 */

import { mergeRight } from 'ramda'

import type { TUser, TRootStore, TArticle } from '@/spec'
import { THREAD } from '@/constant/thread'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'
import { changeset } from '@/validator'

import { FavoriteCategory, PagedFavoriteCategories, emptyPagi } from '@/model'

const emptyCat = {
  id: '',
  title: '',
  desc: '',
  private: false,
}

const CollectionFolder = T.model('CollectionFolder', {
  displayMode: T.opt(T.enum('displayMode', ['list', 'hide']), 'hide'),
  pagedCategories: T.opt(PagedFavoriteCategories, emptyPagi),
  editCategory: T.opt(FavoriteCategory, emptyCat),
  /* curView: T.opt(T.enum('curView', ['box', 'list']), 'box'), */
  showModal: T.opt(T.bool, false),
  showUpdater: T.opt(T.bool, false),
  showCreator: T.opt(T.bool, false),
  showSetter: T.opt(T.bool, false),
  // 创建或编辑的操作是否由 Setter 哪里发起，涉及文案，以及上一步、取消等逻辑
  actionFromSetter: T.opt(T.bool, false),
  thread: T.opt(T.enum([THREAD.POST]), THREAD.POST),
  loading: T.opt(T.bool, false),
  doing: T.opt(T.bool, false),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore

      return root.account.isLogin
    },
    get viewingUser(): TUser {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.user)
    },
    get isSelfViewing(): boolean {
      const root = getParent(self) as TRootStore
      return root.viewing.isSelfViewing
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return root.viewing.viewingArticle
    },
    get editCategoryData() {
      return toJS(self.editCategory)
    },
    get pagedCategoriesData() {
      return toJS(self.pagedCategories)
    },
    get isCreatorView(): boolean {
      const { showModal, showUpdater, showCreator, showSetter } = self
      return showModal && showCreator && !showUpdater && !showSetter
    },
    get isUpdaterView(): boolean {
      const { showModal, showUpdater, showCreator, showSetter } = self
      return showModal && showUpdater && !showCreator && !showSetter
    },
    get isSetterView(): boolean {
      const { showModal, showUpdater, showCreator, showSetter } = self
      return showModal && showSetter && !showCreator && !showUpdater
    },
  }))
  .actions((self) => ({
    authWarning(options): void {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    isMemberOf(type): boolean {
      const root = getParent(self) as TRootStore
      return root.isMemberOf(type)
    },
    changesetErr(options): void {
      const root = getParent(self) as TRootStore
      root.changesetErr(mergeRight({ position: 'topCenter' }, options))
    },
    updateEditing(sobj): void {
      const slf = self as TStore
      const editCategory = mergeRight(slf.editCategoryData, { ...sobj })
      slf.mark({ editCategory })
    },
    validator(type): boolean {
      const slf = self as TStore
      switch (type) {
        case 'publish': {
          const opt = { msg: '不能为空 (请填写 #必填# 字段)' }
          const result = changeset(slf.editCategoryData)
            /* @ts-ignore */
            .exist({ title: '收藏夹名称' }, slf.changesetErr, opt)
            .done()

          return result.passed
        }
        default: {
          return false
        }
      }
    },

    changeViewTo(view = 'creator'): void {
      // if (!self.isLogin) return self.authWarning()
      const slf = self as TStore

      switch (view) {
        case 'setter':
          return slf.mark({
            showModal: true,
            showSetter: true,
            showUpdater: false,
            showCreator: false,
          })

        case 'updater':
          return slf.mark({
            showModal: true,
            showUpdater: true,
            showCreator: false,
            showSetter: false,
          })

        default:
          return slf.mark({
            showModal: true,
            showCreator: true,
            showUpdater: false,
            showSetter: false,
          })
      }
    },
    cleanEditData(): void {
      const slf = self as TStore
      /* @ts-ignore */
      slf.editCategory = emptyCat
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof CollectionFolder>
export const useStore = (): TStore => useMobxContext().store.collectionFolder

export default CollectionFolder
