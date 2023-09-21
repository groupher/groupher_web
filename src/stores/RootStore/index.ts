/*
 * rootStore store

 * NOTE: this file is generate automatically, DO NOT modify
 * unless you're sure what you're doing
 *
 */

import { merge, pickBy } from 'ramda'

import type { TAccount, TRoute, TThread, TArticle } from '@/spec'

import EVENT from '@/constant/event'
import METRIC from '@/constant/metric'

import { T, markStates, Instance } from '@/mobx'
import { notEmpty } from '@/validator'
import { toast, send } from '@/signal'

import {
  // domain
  RouteStore,
  AccountStore,
  GlobalLayoutStore,
  RichEditorStore,
  // HeaderStore,
  ViewingStore,
  ThemeStore,
  ThemeDefaults,
  ErrorBoxStore,

  // threads
  ArticleDigestStore,
  // content
  CommunityContentStore,
  // ExploreContentStore,
  CommunityEditorStore,
  UserContentStore,
  // viewers
  // RepoViewerStore,
  CommentsStore,
  MailsViewerStore,

  // toolbox
  DrawerStore,
  // SidebarStore,
  // RepoEditorStore,
  AccountEditorStore,
  MailBoxStore,
  AvatarAdderStore,
  TagsBarStore,
  UserListerStore,
  // CashierStore,
  // user page
  UserSettingsStore,
  UserBillingStore,
  //

  // GEN: IMPORT SUBSTORE
  PassportEditorStore,
  LandingPageStore,
  CoverEditorStore,
  TagSettingEditorStore,
  AuthWallStore,
  SubscriberStore,
  DashboardThreadStore,
  WallpaperEditorStore,
  DocThreadStore,
  AboutThreadStore,
  ChangelogThreadStore,
  KanbanThreadStore,
  UserPublishedArticlesStore,
  CommunityTagSetterStore,
  CollectionFolderStore,
  ShareStore,
  ArticleContentStore,
  ArticleViewerStore,
  ArticlesThreadStore,
  ThreadSidebarStore,
  AbuseReportStore,
  CommunityJoinBadgeStore,
  ArticleEditorStore,
  UserProfileStore,
  // MembershipContentStore,
  ArticleFooterStore,
  ArticleStickerStore,
  ModeLineMenuStore,
  ModeLineStore,
  // SubscribeContentStore,
  // RecipesContentStore,
  JoinModalStore,
  C11NSettingPanelStore,
} from '..'

const rootStore = T.model({
  // domain stores
  account: T.opt(AccountStore, {}),
  route: T.opt(RouteStore, {}),
  viewing: T.opt(ViewingStore, {}),
  comments: T.opt(CommentsStore, {}),
  metric: T.opt(T.string, METRIC.COMMUNITY),
  // @ts-ignore TODO:
  theme: T.opt(ThemeStore, ThemeDefaults),
  locale: T.opt(T.enum('locale', ['zh', 'en']), 'zh'),
  errorCode: T.maybeNull(T.number),

  communityDigestInView: T.opt(T.bool, true),
  // domain end

  // toolbox
  drawer: T.opt(DrawerStore, { visible: false }),
  // repoEditor: T.opt(RepoEditorStore, {}),
  accountEditor: T.opt(AccountEditorStore, {}),
  mailBox: T.opt(MailBoxStore, {}),
  avatarAdder: T.opt(AvatarAdderStore, {}),
  // toolbox end

  // layouts > xxx > papers
  // layouts
  globalLayout: T.opt(GlobalLayoutStore, {}),
  richEditor: T.opt(RichEditorStore, {}),
  // header: T.opt(HeaderStore, {}),
  // layouts end

  errorBox: T.opt(ErrorBoxStore, {}),

  // banners
  articleDigest: T.opt(ArticleDigestStore, {}),

  // content
  communityContent: T.opt(CommunityContentStore, {}),

  // exploreContent: T.opt(ExploreContentStore, {}),
  communityEditor: T.opt(CommunityEditorStore, {}),
  userContent: T.opt(UserContentStore, {}),
  // content end

  // footer
  // footer: T.opt(FooterStore, {}),
  // threads

  tagsBar: T.opt(TagsBarStore, {}),
  userLister: T.opt(UserListerStore, {}),
  // cashier: T.opt(CashierStore, {}),

  // viewers (for drawer usage)
  mailsViewer: T.opt(MailsViewerStore, {}),

  // user page
  userBilling: T.opt(UserBillingStore, {}),
  userSettings: T.opt(UserSettingsStore, {}),

  // have a drink

  // GEN: PLUG SUBSTORE TO ROOTSTORE
  passportEditor: T.opt(PassportEditorStore, {}),
  landingPage: T.opt(LandingPageStore, {}),
  coverEditor: T.opt(CoverEditorStore, {}),
  tagSettingEditor: T.opt(TagSettingEditorStore, {}),
  authWall: T.opt(AuthWallStore, {}),
  subscriber: T.opt(SubscriberStore, {}),
  dashboardThread: T.opt(DashboardThreadStore, {}),
  wallpaperEditor: T.opt(WallpaperEditorStore, {}),
  docThread: T.opt(DocThreadStore, {}),
  aboutThread: T.opt(AboutThreadStore, {}),
  changelogThread: T.opt(ChangelogThreadStore, {}),
  kanbanThread: T.opt(KanbanThreadStore, {}),
  userPublishedArticles: T.opt(UserPublishedArticlesStore, {}),
  communityTagSetter: T.opt(CommunityTagSetterStore, {}),
  collectionFolder: T.opt(CollectionFolderStore, {}),
  share: T.opt(ShareStore, {}),
  articleContent: T.opt(ArticleContentStore, {}),
  articleViewer: T.opt(ArticleViewerStore, {}),
  articlesThread: T.opt(ArticlesThreadStore, {}),
  threadSidebar: T.opt(ThreadSidebarStore, {}),
  abuseReport: T.opt(AbuseReportStore, {}),
  communityJoinBadge: T.opt(CommunityJoinBadgeStore, {}),
  articleEditor: T.opt(ArticleEditorStore, {}),
  userProfile: T.opt(UserProfileStore, {}),
  articleFooter: T.opt(ArticleFooterStore, {}),
  articleSticker: T.opt(ArticleStickerStore, {}),
  modeLineMenu: T.opt(ModeLineMenuStore, {}),
  modeLine: T.opt(ModeLineStore, {}),
  // recipesContent: T.opt(RecipesContentStore, {}),
  joinModal: T.opt(JoinModalStore, {}),
  c11NSettingPanel: T.opt(C11NSettingPanelStore, {}),
})
  .views((self) => ({
    get isOnline(): boolean {
      return self.globalLayout.online
    },
    get isMobile(): boolean {
      return self.globalLayout.isMobile
    },
    get viewingArticle(): TArticle {
      return self.viewing.viewingArticle
    },
    get curRoute(): TRoute {
      return self.route.curRoute
    },
    get accountInfo(): TAccount {
      return self.account.accountInfo
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
    changeTheme(name): void {
      self.theme.changeTheme(name)
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
        toast(merge(defaultOpt, options), 'warn')
      }

      send(EVENT.LOGIN_PANEL)
    },
    changesetErr(options): void {
      // @ts-ignore TODO:
      // toast('error', options)
    },
    updateC11N(options): void {
      self.account.updateC11N(options)
    },
    isMemberOf(type): boolean {
      return self.account.isMemberOf(type)
    },
    // get general args when query paged articles from server
    getPagedArticleArgs(
      page: number,
      // 每个 thread 的 ArticlesFilter 选项
      articlesfilter = {},
    ): Record<string, unknown> {
      const { isLogin: userHasLogin, pageDensity: size } = self.account
      const tag = self.tagsBar.activeTagData
      const { community } = self.viewing

      const filter = pickBy(notEmpty, {
        page,
        size,
        articleTag: tag.slug,
        community: community.slug,
        ...articlesfilter,
      })

      return { filter, userHasLogin }
    },

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
