/*
 * rootStore store

 * NOTE: this file is generate automatically, DO NOT modify
 * unless you're sure what you're doing
 *
 */

import { mergeRight, values } from 'ramda'

import type { TRoute, TThread, TArticle, TLocale } from '@/spec'

import EVENT from '@/const/event'
import METRIC from '@/const/metric'
import { LOCALE } from '@/const/i18n'

import { T, markStates, type Instance } from '@/mobx'
import { toast, send } from '@/signal'

import {
  // domain
  RouteStore,
  // AccountStore,
  RichEditorStore,
  // HeaderStore,
  ViewingStore,
  ArticlesStore,
  ErrorBoxStore,
  MushroomStore,
  // content
  // ExploreContentStore,
  CommunityEditorStore,
  // UserContentStore,
  // viewers
  // RepoViewerStore,
  CommentsStore,
  // MailsViewerStore,
  // toolbox
  DrawerStore,
  // SidebarStore,
  // RepoEditorStore,
  AccountEditorStore,
  // MailBoxStore,
  TagsBarStore,
  // GEN: IMPORT SUBSTORE
  PassportEditorStore,
  CoverEditorStore,
  TagSettingEditorStore,
  // SubscriberStore,
  DashboardThreadStore,
  WallpaperEditorStore,
  DocThreadStore,
  AboutThreadStore,
  // CollectionFolderStore,
  ArticleViewerStore,
  // AbuseReportStore,
  ArticleEditorStore,
  // UserProfileStore,
  // MembershipContentStore,
  ModeLineMenuStore,
  ModeLineStore,
  // SubscribeContentStore,
  // RecipesContentStore,
  // C11NSettingPanelStore,
} from '..'

const rootStore = T.model({
  // domain stores
  isMobile: T.opt(T.bool, false),
  activeDemo: T.opt(T.str, ''),
  // account: T.opt(AccountStore, {}),
  route: T.opt(RouteStore, {}),
  viewing: T.opt(ViewingStore, {}),
  articles: T.opt(ArticlesStore, {}),
  comments: T.opt(CommentsStore, {}),
  metric: T.opt(T.str, METRIC.COMMUNITY),
  // @ts-ignore TODO:
  locale: T.opt(T.enum('locale', values(LOCALE)), LOCALE.EN),
  localeData: T.opt(T.str, '{}'),
  errorCode: T.maybeNull(T.number),

  communityDigestInView: T.opt(T.bool, true),
  // domain end

  // toolbox
  drawer: T.opt(DrawerStore, { visible: false }),
  // repoEditor: T.opt(RepoEditorStore, {}),
  accountEditor: T.opt(AccountEditorStore, {}),
  // mailBox: T.opt(MailBoxStore, {}),
  // toolbox end

  // layouts > xxx > papers
  richEditor: T.opt(RichEditorStore, {}),
  // header: T.opt(HeaderStore, {}),
  // layouts end

  errorBox: T.opt(ErrorBoxStore, {}),
  mushroom: T.opt(MushroomStore, {}),

  // content
  // communityContent: T.opt(CommunityContentStore, {}),

  // exploreContent: T.opt(ExploreContentStore, {}),
  communityEditor: T.opt(CommunityEditorStore, {}),
  // userContent: T.opt(UserContentStore, {}),
  // content end

  // footer
  // footer: T.opt(FooterStore, {}),
  // threads

  tagsBar: T.opt(TagsBarStore, {}),

  // viewers (for drawer usage)
  // mailsViewer: T.opt(MailsViewerStore, {}),

  // GEN: PLUG SUBSTORE TO ROOTSTORE
  passportEditor: T.opt(PassportEditorStore, {}),
  coverEditor: T.opt(CoverEditorStore, {}),
  tagSettingEditor: T.opt(TagSettingEditorStore, {}),
  // subscriber: T.opt(SubscriberStore, {}),
  dashboardThread: T.opt(DashboardThreadStore, {}),
  wallpaperEditor: T.opt(WallpaperEditorStore, {}),
  docThread: T.opt(DocThreadStore, {}),
  aboutThread: T.opt(AboutThreadStore, {}),
  // collectionFolder: T.opt(CollectionFolderStore, {}),
  articleViewer: T.opt(ArticleViewerStore, {}),
  // abuseReport: T.opt(AbuseReportStore, {}),
  articleEditor: T.opt(ArticleEditorStore, {}),
  // userProfile: T.opt(UserProfileStore, {}),
  modeLineMenu: T.opt(ModeLineMenuStore, {}),
  modeLine: T.opt(ModeLineStore, {}),
  // recipesContent: T.opt(RecipesContentStore, {}),
  // c11NSettingPanel: T.opt(C11NSettingPanelStore, {}),
})
  .views((self) => ({
    get isOnline(): boolean {
      return self.mushroom.online
    },
    get viewingArticle(): TArticle {
      return self.viewing.viewingArticle
    },
    get curRoute(): TRoute {
      return self.route.curRoute
    },
  }))
  .actions((self) => ({
    markRoute(query, opt = {}): void {
      self.route.markRoute(query, opt)
    },
    showTopModeline(bool: boolean): void {
      self.modeLine.showTopBar(bool)
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
    setLocale(locale: TLocale): void {
      self.locale = locale
    },
    setLocaleData(localeStr: string): void {
      self.localeData = localeStr
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
