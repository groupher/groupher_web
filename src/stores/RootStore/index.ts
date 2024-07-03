/*
 * rootStore store

 * NOTE: this file is generate automatically, DO NOT modify
 * unless you're sure what you're doing
 */

import { mergeRight } from 'ramda'

import type { TThread, TArticle } from '~/spec'

import EVENT from '~/const/event'

import { T, markStates, type Instance } from '~/mobx'
import { toast, send } from '~/signal'

import {
  RichEditorStore,
  ViewingStore,
  ArticlesStore,
  ErrorBoxStore,
  MushroomStore,
  CommentsStore,
  DrawerStore,
  ArticleEditorStore,
} from '..'

const rootStore = T.model({
  // domain stores
  isMobile: T.opt(T.bool, false),
  activeDemo: T.opt(T.str, ''),
  // account: T.opt(AccountStore, {}),
  viewing: T.opt(ViewingStore, {}),
  articles: T.opt(ArticlesStore, {}),
  comments: T.opt(CommentsStore, {}),

  // toolbox
  drawer: T.opt(DrawerStore, { visible: false }),
  // repoEditor: T.opt(RepoEditorStore, {}),

  richEditor: T.opt(RichEditorStore, {}),

  errorBox: T.opt(ErrorBoxStore, {}),
  mushroom: T.opt(MushroomStore, {}),

  // GEN: PLUG SUBSTORE TO ROOTSTORE
  articleEditor: T.opt(ArticleEditorStore, {}),
})
  .views((self) => ({
    get isOnline(): boolean {
      return self.mushroom.online
    },
    get viewingArticle(): TArticle {
      return self.viewing.viewingArticle
    },
  }))
  .actions((self) => ({
    markRoute(query, opt = {}): void {
      console.log('## TODO mark route')
      // self.route.markRoute(query, opt)
    },
    showTopModeline(bool: boolean): void {
      // self.modeLine.showTopBar(bool)
    },
    closeDrawer(): void {
      self.drawer.close()
    },
    setViewing(sobj): void {
      self.viewing.setViewing(sobj)
    },
    setCurThread(thread: TThread): void {
      self.viewing.setCurThread(thread)
    },
    resetViewing(): void {
      self.viewing.resetViewing()
    },
    updateViewingIfNeed(type, sobj): void {
      self.viewing.updateViewingIfNeed(type, sobj)
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    sponsorHepler(): void {},
    cashierHelper(opt): void {
      // self.footer.closeSponsor()
      // self.cashier.callCashier(opt)
    },
    authWarning(options = {}): void {
      const defaultOpt = {
        position: 'topCenter',
        title: '当前账号未登录',
        msg: '暂不支持匿名操作，请登录后再次尝试.',
      }

      // @ts-ignore TODO:
      if (options?.hideToast === true) {
        // pass
      } else {
        // @ts-ignore TODO:
        toast(mergeRight(defaultOpt, options), 'warn')
      }

      send(EVENT.LOGIN_PANEL)
    },
    changesetErr(options): void {
      // @ts-ignore TODO:
      // toast('error', options)
    },
    isMemberOf(type): boolean {
      // return self.account.isMemberOf(type)
      return false
    },
    // get general args when query paged articles from server
    onAdsClose(): void {
      // const { isMemberOf } = self.account
      // if (isMemberOf('seniorMember') || isMemberOf('sponsorMember')) {
      //   return void
      // }
    },
    mark(sobj): void {
      markStates(sobj, self)
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
