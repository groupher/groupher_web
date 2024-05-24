import { battery, markStore, toJS } from '@/mobx'

import {
  uniq,
  pluck,
  pick,
  equals,
  mapObjIndexed,
  clone,
  findIndex,
  update,
  mergeLeft,
} from 'ramda'

import type { TCommunity, TCommunityThread, TTag, TNameAlias } from '@/spec'
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
import BStore from '@/utils/bstore'
import { publicThreads } from '@/helper'

import type {
  TStore,
  TSettingField,
  TInitSettings,
  TSettingsFields,
  TCurPageLinksKey,
  THeaderSettings,
  TFooterSettings,
  TDocSettings,
  TRootStore,
} from './spec'
import {
  EMPTY_MEDIA_REPORT,
  HEADER_SETTING_KEYS,
  FOOTER_SETTING_KEYS,
  DASHBOARD_DEMO_KEY,
  SETTING_FIELD,
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

// theme store
const createDashboardStore = (rootStore: TRootStore, initState: TInitSettings = {}): TStore => {
  const store = mergeLeft(initState, {
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
    get curCommunity(): TCommunity {
      return rootStore.viewing.community
    },

    get tagGroups(): string[] {
      const self = this as TStore
      const { tags } = self

      return uniq(pluck('group', tags))
    },

    get curPageLinksKey(): TCurPageLinksKey {
      const isFooter = this.curTab === DASHBOARD_ROUTE.FOOTER

      return {
        links: isFooter ? 'footerLinks' : 'headerLinks',
        settings: isFooter ? 'footerSettings' : 'headerSettings',
      }
    },

    // this is private, no need to export to store spec
    get _validThreads(): TCommunityThread[] {
      const self = this as TStore
      const { curCommunity, enable, nameAlias } = self

      if (!curCommunity?.threads) return []

      return publicThreads(curCommunity.threads, {
        enable,
        nameAlias,
      })
    },

    get headerSettings(): THeaderSettings {
      const self = this as TStore
      const threads = self._validThreads

      return {
        ...pick(HEADER_SETTING_KEYS, self),
        threads,
      }
    },

    get footerSettings(): TFooterSettings {
      const self = this as TStore
      const threads = self._validThreads

      return {
        ...pick(FOOTER_SETTING_KEYS, self),
        threads,
      }
    },

    get docSettings(): TDocSettings {
      return {
        categories: this.docCategories,
      }
    },

    // actions
    setAllPassportRules(rootRules: string, moderatorRules: string): void {
      store.allRootRules = rootRules
      store.allModeratorRules = moderatorRules
    },

    /**
     * init activeTagThread for dashboard tags settings
     * based on enableSettings
     */
    _initActiveTagThreadIfneed(): void {
      const { curTab, enable } = store

      if (curTab !== DASHBOARD_ROUTE.TAGS) return

      if (enable.post) {
        setTimeout(() => store.mark({ activeTagThread: THREAD.POST }))
      } else if (enable.kanban) {
        setTimeout(() => store.mark({ activeTagThread: THREAD.KANBAN }))
      } else if (enable.changelog) {
        setTimeout(() => store.mark({ activeTagThread: THREAD.CHANGELOG }))
      } else {
        setTimeout(() => store.mark({ activeTagThread: null }))
      }
    },

    clearLocalSettings(): void {
      BStore.remove(DASHBOARD_DEMO_KEY)

      mapObjIndexed((value, key) => {
        if (!equals(store[key], store.defaultSettings[key])) {
          // @ts-ignore
          if (key !== 'defaultSettings' && key !== 'initSettings') {
            store.mark({ [key]: value })
          }
        }
      }, store.defaultSettings)

      store.mark({ demoAlertEnable: false, saving: false, initSettings: store.defaultSettings })
    },

    _loadLocalSettings(): boolean {
      const dashboardDemoSettings = BStore.get(DASHBOARD_DEMO_KEY)

      if (dashboardDemoSettings) {
        const settingsObj = JSON.parse(dashboardDemoSettings)

        setTimeout(() => {
          mapObjIndexed((value, key) => {
            if (!equals(store[key], settingsObj[key])) {
              store.mark({ [key]: value })
            }
          }, settingsObj)

          store.mark({ saving: false, initSettings: settingsObj, demoAlertEnable: true })
        })
        return true
      }

      return false
    },

    /** it also maybe called by landing page */
    changeGlowEffect(glowType: string): void {
      store.glowType = glowType
    },

    /**
     * this is for mutation params after on save
     * TODO: re-move it to useEdit hooks
     */
    onSave(field: TSettingField): void {
      const self = this as TStore

      if (field === SETTING_FIELD.TAG) {
        const { editingTag } = store
        const targetIdx = self._findTagIdx()
        if (targetIdx < 0) return

        store.tags[targetIdx] = clone(editingTag)
      }

      if (field === SETTING_FIELD.NAME_ALIAS) {
        const { editingAlias } = store

        const targetIdx = store._findAliasIdx()
        if (targetIdx < 0) return

        store.nameAlias[targetIdx] = clone(editingAlias)
      }
    },

    updateViewingCommunity(args: TCommunity): void {
      rootStore.viewing.updateViewingCommunity(args)
    },

    _findTagIdx(): number {
      const self = this as TStore

      const { tags, editingTag } = self
      const targetIdx = findIndex((item: TTag) => item.id === editingTag.id, toJS(tags))
      return targetIdx
    },

    _findAliasIdx(): number {
      const self = this as TStore

      const { nameAlias, editingAlias } = self
      const targetIdx = findIndex(
        (item: TNameAlias) => item.slug === editingAlias.slug,
        toJS(nameAlias),
      )

      return targetIdx
    },

    updateEditingTag() {
      const self = this as TStore
      const { editingTag, tags } = self

      const _editingTag = toJS(editingTag)
      const _tags = toJS(tags)
      const _initSettings = toJS(self.initSettings)

      const targetIndex = findIndex((item: TTag) => item.id === editingTag.id, _tags)
      const updatedTags = update(targetIndex, _editingTag, _tags)

      const initSettings = { ..._initSettings, tags: updatedTags }
      self.mark({ initSettings })
    },

    updateEditing(sobj): void {
      const self = this as TStore
      self.mark(sobj)
    },

    mark(sobj: Record<string, any>): void {
      markStore(sobj, store)
    },
  })

  return battery(store)
}

export default createDashboardStore
