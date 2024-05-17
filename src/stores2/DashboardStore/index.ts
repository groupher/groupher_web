import { battery } from '@/mobx'

import { LOCALE } from '@/constant/i18n'
import { THREAD } from '@/constant/thread'
import SIZE from '@/constant/size'
import { COLOR_NAME } from '@/constant/colors'
import { BUILDIN_ALIAS } from '@/constant/name'
import { GLOW_OPACITY } from '@/constant/glow_effect'
import { CHANGE_MODE } from '@/constant/mode'
import { TW_CARD, WIDGET_TYPE, INIT_KANBAN_COLORS, DEFAULT_ENABLE } from '@/constant/dashboard'
import {
  HEADER_LAYOUT,
  FOOTER_LAYOUT,
  POST_LAYOUT,
  CHANGELOG_LAYOUT,
  KANBAN_LAYOUT,
  KANBAN_CARD_LAYOUT,
  DOC_LAYOUT,
  DOC_FAQ_LAYOUT,
  TAG_LAYOUT,
  AVATAR_LAYOUT,
  BRAND_LAYOUT,
  BANNER_LAYOUT,
  TOPBAR_LAYOUT,
  BROADCAST_LAYOUT,
  BROADCAST_ARTICLE_LAYOUT,
  RSS_TYPE,
} from '@/constant/layout'

import type { TDashbaordStore, TSettingsModalFields } from './spec'

import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

export const settingsModalFields: TSettingsModalFields = {
  // baseInfo
  favicon: '',
  logo: '',
  locale: LOCALE.EN,
  title: '',
  slug: '',
  desc: '',
  introduction: '',
  homepage: '',
  city: '',
  techstack: '',

  // social
  // socialLinks: T.opt(T.array(SocialLink), []),
  // mediaReports: T.opt(T.array(MediaReport), [EMPTY_MEDIA_REPORT]),

  // seo
  seoEnable: true,
  ogSiteName: '',
  ogTitle: '',
  ogDescription: '',
  ogUrl: '',
  ogImage: '',
  ogLocale: '',
  ogPublisher: '',

  twTitle: '',
  twDescription: '',
  twUrl: '',
  twCard: TW_CARD.SUMMARY,
  twSite: '',
  twImage: '',
  twImageWidth: '',
  twImageHeight: '',

  // layout
  primaryColor: COLOR_NAME.BLACK,
  postLayout: POST_LAYOUT.QUORA,
  kanbanLayout: KANBAN_LAYOUT.CLASSIC,
  kanbanCardLayout: KANBAN_CARD_LAYOUT.SIMPLE,
  kanbanBgColors: INIT_KANBAN_COLORS,

  docLayout: DOC_LAYOUT.CARDS,
  docFaqLayout: DOC_FAQ_LAYOUT.COLLAPSE,
  tagLayout: TAG_LAYOUT.HASH,
  avatarLayout: AVATAR_LAYOUT.SQUARE,
  brandLayout: BRAND_LAYOUT.BOTH,
  bannerLayout: BANNER_LAYOUT.HEADER,
  topbarLayout: TOPBAR_LAYOUT.NO,
  topbarBg: COLOR_NAME.ORANGE,

  broadcastLayout: BROADCAST_LAYOUT.DEFAULT,
  broadcastBg: COLOR_NAME.BLACK,
  broadcastEnable: false,

  broadcastArticleLayout: BROADCAST_ARTICLE_LAYOUT.DEFAULT,
  broadcastArticleBg: COLOR_NAME.RED,
  broadcastArticleEnable: true,

  changelogLayout: CHANGELOG_LAYOUT.CLASSIC,

  // doc
  // docCategories: [],

  // glow effect
  glowType: '',
  glowFixed: true,
  glowOpacity: GLOW_OPACITY.NORMAL,

  // goss blur
  gossBlur: 100,
  gossBlurDark: 100,

  // contents
  // tags
  // tags: T.opt(T.array(Tag), mockTags(12)),
  tags: [],
  activeTagGroup: null,
  activeTagThread: null,
  nameAlias: BUILDIN_ALIAS,
  enable: DEFAULT_ENABLE,

  // faqSections: DEFAULT_FAQ_ITEMS,
  // rssFeedType: RSS_TYPE.DIGEST,

  rssFeedCount: 5,

  headerLayout: HEADER_LAYOUT.CENTER,
  footerLayout: FOOTER_LAYOUT.GROUP,

  // footerLinks: T.opt(T.array(LinkItem), DEFAULT_LINK_ITEMS),
  footerLinks: [],
  headerLinks: [],

  // moderators

  moderators: [],

  // widgets
  widgetsPrimaryColor: COLOR_NAME.BLACK,
  widgetsThreads: THREAD.POST,
  widgetsSize: SIZE.MEDIUM,
  widgetsType: WIDGET_TYPE.SIDEBAR,
}

// theme store
const createDashboardStore = (): TDashbaordStore => {
  const store = {
    ...settingsModalFields,

    savingField: null,
    saving: false,
    loading: false,
    curTab: DASHBOARD_ROUTE.INFO,
    baseInfoTab: DASHBOARD_BASEINFO_ROUTE.BASIC,

    aliasTab: DASHBOARD_ALIAS_ROUTE.THREAD,
    seoTab: DASHBOARD_SEO_ROUTE.SEARCH_ENGINE,
    docTab: DASHBOARD_DOC_ROUTE.TABLE,
    layoutTab: DASHBOARD_LAYOUT_ROUTE.GLOBAL,
    broadcastTab: DASHBOARD_BROADCAST_ROUTE.GLOBAL,

    // overview
    // overview: T.opt(Overview, {}),

    // editing
    editingTag: null,
    settingTag: null,
    editingAlias: null,
    editingLink: null,
    editingLinkMode: CHANGE_MODE.CREATE,

    editingGroup: null,
    editingGroupIndex: null,
    editingFAQIndex: null,
    // editingFAQ: T.maybeNull(FAQSection),

    queringMediaReportIndex: null,
    // initSettings: T.opt(InitSettings, {}),
    // defaultSettings: T.opt(InitSettings, {}),

    // cms
    batchSelectedIDs: [],
    // pagedCommunities: T.opt(PagedCommunities, emptyPagi),
    // pagedPosts: T.opt(PagedPosts, emptyPagi),
    // pagedDocs: T.opt(PagedDocs, emptyPagi),
    // pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),

    // for global alert
    demoAlertEnable: false,

    // activeModerator: T.maybeNull(User),
    allModeratorRules: '{}',
    allRootRules: '{}',
    // views
    // get themeData() {
    //   return ''
    // },

    // actions
    // change: (theme: TThemeName) => {
    //   store.theme = theme
    // },
    // toggle() {
    //   store.theme = store.theme === THEME.DAY ? THEME.NIGHT : THEME.DAY
    // },
  }

  return battery(store)
}

export default createDashboardStore
