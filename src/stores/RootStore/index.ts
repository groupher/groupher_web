/*
 * rootStore store

 * NOTE: this file is generate automatically, DO NOT modify
 * unless you're sure what you're doing
 */

import type { TArticle } from '~/spec'

import { T, type Instance } from '~/mobx'

import { ViewingStore, MushroomStore, CommentsStore, DrawerStore } from '..'

const rootStore = T.model({
  viewing: T.opt(ViewingStore, {}),
  // TODO: next
  comments: T.opt(CommentsStore, {}),

  // toolbox
  drawer: T.opt(DrawerStore, { visible: false }),
  mushroom: T.opt(MushroomStore, {}),
})
  .views((self) => ({
    get viewingArticle(): TArticle {
      return self.viewing.viewingArticle
    },
  }))
  .actions((self) => ({
    showTopModeline(bool: boolean): void {
      // self.modeLine.showTopBar(bool)
    },
    setViewing(sobj): void {
      self.viewing.setViewing(sobj)
    },
  }))

/**
 *   NOTE: if use TRootStore in sub container, e.g:
 * get viewingArticle(): TArticle {
 *   const root = getParent(self) as TRootStore
 *   return toJS(root.viewingArticle)
 * },
 *
 * MAKE SURE get helper has a return TYPE, otherwise it
 * will cause  cyccle import error, which will cause type
 * completion fails
 *
 */
export type TRootStore = Instance<typeof rootStore>

export default rootStore
