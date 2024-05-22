import { battery } from '@/mobx'

import { uniq, pluck, pick, reject, isEmpty } from 'ramda'

import type { TCommunity, TSocialItem, TCommunityThread } from '@/spec'
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
import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/constant/route'
import { publicThreads } from '@/helper'

import type {
  TDashbaordStore,
  TSettingsFields,
  TCurPageLinksKey,
  THeaderSettings,
  TFooterSettings,
  TDocSettings,
  TBaseInfoSettings,
  TRootStore,
} from './spec'
import {
  BASEINFO_KEYS,
  EMPTY_MEDIA_REPORT,
  HEADER_SETTING_KEYS,
  FOOTER_SETTING_KEYS,
} from './constant'

export const settingsFields: TSettingsFields = {
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
  socialLinks: [],
  mediaReports: [EMPTY_MEDIA_REPORT],

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
  docCategories: [],

  // glow effect
  glowType: '',
  glowFixed: true,
  glowOpacity: GLOW_OPACITY.NORMAL,

  // goss blur
  gossBlur: 100,
  gossBlurDark: 100,

  // contents
  // tags
  tags: [],
  activeTagGroup: null,
  activeTagThread: null,
  nameAlias: BUILDIN_ALIAS,
  enable: DEFAULT_ENABLE,

  // faqSections: DEFAULT_FAQ_ITEMS,
  rssFeedType: RSS_TYPE.DIGEST,
  rssFeedCount: 5,

  headerLayout: HEADER_LAYOUT.CENTER,
  footerLayout: FOOTER_LAYOUT.GROUP,

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
const createDashboardStore = (rootStore: TRootStore): TDashbaordStore => {
  const store = {
    ...settingsFields,
    initSettings: settingsFields,
    defaultSettings: settingsFields,

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
    overview: null,

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

    // -- views
    get curCommunity(): TCommunity {
      return rootStore.viewing.community
    },

    get tagGroups(): string[] {
      const { tags } = store

      return uniq(pluck('group', tags))
    },

    get curPageLinksKey(): TCurPageLinksKey {
      const isFooter = store.curTab === DASHBOARD_ROUTE.FOOTER

      return {
        links: isFooter ? 'footerLinks' : 'headerLinks',
        settings: isFooter ? 'footerSettings' : 'headerSettings',
      }
    },

    // this is private, no need to export to store spec
    get _validThreads(): TCommunityThread[] {
      const { curCommunity, enable, nameAlias } = store

      return publicThreads(curCommunity.threads, {
        enable,
        nameAlias,
      })
    },

    get headerSettings(): THeaderSettings {
      const threads = store._validThreads

      return {
        ...pick(HEADER_SETTING_KEYS, store),
        threads,
      }
    },

    get footerSettings(): TFooterSettings {
      const threads = store._validThreads

      return {
        ...pick(FOOTER_SETTING_KEYS, store),
        threads,
      }
    },

    get docSettings(): TDocSettings {
      return {
        categories: store.docCategories,
      }
    },

    get baseInfoSettings(): TBaseInfoSettings {
      const baseInfo = pick(BASEINFO_KEYS, store)
      const socialLinks = reject((item: TSocialItem) => isEmpty(item.type), store.socialLinks)

      return {
        ...baseInfo,
        ...pick(
          ['loading', 'saving', 'queringMediaReportIndex', 'baseInfoTab', 'mediaReports'],
          store,
        ),
        socialLinks,
      }
    },

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
