/*
 * rootStore store

 * NOTE: this file is generate automatically, DO NOT modify
 * unless you're sure what you're doing
 *
 */

import { types as T, Instance } from 'mobx-state-tree'
import { merge, pickBy } from 'ramda'

import type { TAccount, TRoute, TThread, TArticle } from '@/spec'

import { EVENT } from '@/constant'
import { markStates } from '@/utils/mobx'
import { send, toast } from '@/utils/helper'
import { notEmpty } from '@/utils/validator'

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
  CommunityDigestStore,
  // content
  CommunityContentStore,
  // ExploreContentStore,
  CommunityEditorStore,
  UserContentStore,
  // footer
  // FooterStore,
  // viewers
  // RepoViewerStore,
  CommentsStore,
  MailsViewerStore,

  // toolbox
  // DoraemonStore,
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
  DashboardThreadStore,
  WallpaperEditorStore,
  HelpThreadStore,
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
} from '../index'

const rootStore = T.model({
  // domain stores
  account: T.optional(AccountStore, {}),
  route: T.optional(RouteStore, {}),
  viewing: T.optional(ViewingStore, {}),
  comments: T.optional(CommentsStore, {}),
  // @ts-ignore TODO:
  theme: T.optional(ThemeStore, ThemeDefaults),
  locale: T.optional(T.enumeration('locale', ['zh', 'en']), 'zh'),
  errorCode: T.maybeNull(T.number),
  // domain end

  // toolbox
  drawer: T.optional(DrawerStore, { visible: false }),
  // doraemon: T.optional(DoraemonStore, {}),
  // repoEditor: T.optional(RepoEditorStore, {}),
  accountEditor: T.optional(AccountEditorStore, {}),
  mailBox: T.optional(MailBoxStore, {}),
  avatarAdder: T.optional(AvatarAdderStore, {}),
  // toolbox end

  // layouts > xxx > papers
  // layouts
  globalLayout: T.optional(GlobalLayoutStore, {}),
  richEditor: T.optional(RichEditorStore, {}),
  // header: T.optional(HeaderStore, {}),
  // layouts end

  errorBox: T.optional(ErrorBoxStore, {}),

  // banners
  articleDigest: T.optional(ArticleDigestStore, {}),
  communityDigest: T.optional(CommunityDigestStore, {}),

  // content
  communityContent: T.optional(CommunityContentStore, {}),

  // exploreContent: T.optional(ExploreContentStore, {}),
  communityEditor: T.optional(CommunityEditorStore, {}),
  userContent: T.optional(UserContentStore, {}),
  // content end

  // footer
  // footer: T.optional(FooterStore, {}),
  // threads

  tagsBar: T.optional(TagsBarStore, {}),
  userLister: T.optional(UserListerStore, {}),
  // cashier: T.optional(CashierStore, {}),

  // viewers (for drawer usage)
  mailsViewer: T.optional(MailsViewerStore, {}),

  // user page
  userBilling: T.optional(UserBillingStore, {}),
  userSettings: T.optional(UserSettingsStore, {}),

  // have a drink

  // GEN: PLUG SUBSTORE TO ROOTSTORE
  dashboardThread: T.optional(DashboardThreadStore, {}),
  wallpaperEditor: T.optional(WallpaperEditorStore, {}),
  helpThread: T.optional(HelpThreadStore, {}),
  aboutThread: T.optional(AboutThreadStore, {}),
  changelogThread: T.optional(ChangelogThreadStore, {}),
  kanbanThread: T.optional(KanbanThreadStore, {}),
  userPublishedArticles: T.optional(UserPublishedArticlesStore, {}),
  communityTagSetter: T.optional(CommunityTagSetterStore, {}),
  collectionFolder: T.optional(CollectionFolderStore, {}),
  share: T.optional(ShareStore, {}),
  articleContent: T.optional(ArticleContentStore, {}),
  articleViewer: T.optional(ArticleViewerStore, {}),
  articlesThread: T.optional(ArticlesThreadStore, {}),
  threadSidebar: T.optional(ThreadSidebarStore, {}),
  abuseReport: T.optional(AbuseReportStore, {}),
  communityJoinBadge: T.optional(CommunityJoinBadgeStore, {}),
  articleEditor: T.optional(ArticleEditorStore, {}),
  userProfile: T.optional(UserProfileStore, {}),
  articleFooter: T.optional(ArticleFooterStore, {}),
  articleSticker: T.optional(ArticleStickerStore, {}),
  modeLineMenu: T.optional(ModeLineMenuStore, {}),
  modeLine: T.optional(ModeLineStore, {}),
  // recipesContent: T.optional(RecipesContentStore, {}),
  joinModal: T.optional(JoinModalStore, {}),
  c11NSettingPanel: T.optional(C11NSettingPanelStore, {}),
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
        toast('warn', merge(defaultOpt, options))
      }

      send(EVENT.LOGIN_PANEL)
    },
    changesetErr(options): void {
      // @ts-ignore TODO:
      toast('error', options)
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
        articleTag: tag.raw,
        community: community.raw,
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
