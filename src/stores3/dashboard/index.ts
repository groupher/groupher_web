import { proxy } from 'valtio'
import { mergeDeepRight, equals, mapObjIndexed, mergeLeft } from 'ramda'

import { LOCALE } from '@/const/i18n'
import { THREAD } from '@/const/thread'
import SIZE from '@/const/size'
import { COLOR_NAME } from '@/const/colors'
import { BUILDIN_ALIAS } from '@/const/name'
import { GLOW_OPACITY } from '@/const/glow_effect'
import { CHANGE_MODE } from '@/const/mode'
import { TW_CARD, WIDGET_TYPE, INIT_KANBAN_COLORS, DEFAULT_ENABLE } from '@/const/dashboard'
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
} from '@/const/layout'
import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/const/route'
import BStore from '@/utils/bstore'

import type { TStore, TInitSettings, TSettingsFields, TDocSettings } from './spec'
import {
  EMPTY_MEDIA_REPORT,
  DASHBOARD_DEMO_KEY,
  DEFAULT_FAQ_ITEMS,
  DEFAULT_OVERVIEW,
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

  faqSections: DEFAULT_FAQ_ITEMS,
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

export default (initState: TInitSettings = {}): TStore => {
  const store = proxy(
    mergeLeft(initState, {
      ...settingsFields,
      initFilled: false,
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
      overview: DEFAULT_OVERVIEW,

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
      get tagGroups(): string[] {
        // const { tags } = store

        // return uniq(pluck('group', tags))
        return []
      },

      get docSettings(): TDocSettings {
        return {
          // categories: store.docCategories,
          categories: [], // store.docCategories,
        }
      },

      // actions
      setAllPassportRules: (rootRules: string, moderatorRules: string): void => {
        store.allRootRules = rootRules
        store.allModeratorRules = moderatorRules
      },

      /**
       * init activeTagThread for dashboard tags settings
       * based on enableSettings
       */
      _initActiveTagThreadIfneed: (): void => {
        const { curTab, enable } = store

        if (curTab !== DASHBOARD_ROUTE.TAGS) return

        if (enable.post) {
          setTimeout(() => {
            store.activeTagThread = THREAD.POST
          })
        } else if (enable.kanban) {
          setTimeout(() => {
            store.activeTagThread = THREAD.KANBAN
          })
        } else if (enable.changelog) {
          setTimeout(() => {
            store.activeTagThread = THREAD.CHANGELOG
          })
        } else {
          setTimeout(() => {
            store.activeTagThread = null
          })
        }
      },

      clearLocalSettings: (): void => {
        BStore.remove(DASHBOARD_DEMO_KEY)

        mapObjIndexed((value, key) => {
          if (!equals(store[key], store.defaultSettings[key])) {
            // @ts-ignore
            if (key !== 'defaultSettings' && key !== 'initSettings') {
              // @ts-ignore
              store[key] = value
            }
          }
        }, store.defaultSettings)

        store.demoAlertEnable = false
        store.saving = false
        store.initSettings = store.defaultSettings
      },

      _loadLocalSettings: (): boolean => {
        const dashboardDemoSettings = BStore.get(DASHBOARD_DEMO_KEY)

        if (dashboardDemoSettings) {
          const settingsObj = JSON.parse(dashboardDemoSettings)

          setTimeout(() => {
            mapObjIndexed((value, key) => {
              if (!equals(store[key], settingsObj[key])) {
                // @ts-ignore
                store[key] = value
              }
            }, settingsObj)

            store.saving = false
            store.initSettings = settingsObj
            store.demoAlertEnable = true
          })
          return true
        }

        return false
      },

      /** it also maybe called by landing page */
      changeGlowEffect: (glowType: string): void => {
        store.glowType = glowType
      },

      commit: (updates: Partial<TStore>): void => {
        Object.assign(store, mergeDeepRight(store, updates))
        // for (const [key, value] of Object.entries(updates)) {
        //   store[key] = value
        // }
      },
    }),
  )

  return store
}
