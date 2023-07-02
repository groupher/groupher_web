/*
 * DashboardThread store
 */

import {
  values,
  pick,
  findIndex,
  clone,
  isNil,
  equals,
  omit,
  pluck,
  find,
  propEq,
  uniq,
  filter,
  reject,
  mapObjIndexed,
  includes,
  toUpper,
  any,
} from 'ramda'

import type {
  TCommunity,
  TRootStore,
  TTag,
  TGlobalLayout,
  TThread,
  TSizeSML,
  TColorName,
  TEnableConfig,
  TNameAliasConfig,
  TChangeMode,
} from '@/spec'

import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/constant/route'
import { CHANGE_MODE } from '@/constant/mode'
import { THREAD } from '@/constant/thread'

import BStore from '@/utils/bstore'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'
import { washThreads } from '@/utils/helper'

import { PagedPosts, PagedDocs, PagedChangelogs, Tag, emptyPagi } from '@/model'

import type {
  TBaseInfoSettings,
  TSEOSettings,
  TUiSettings,
  TTagSettings,
  TRSSSettings,
  THeaderSettings,
  TFooterSettings,
  TDocSettings,
  TAliasSettings,
  TTouched,
  TSettingField,
  TNameAlias,
  TWidgetsSettings,
  TBroadcastSettings,
  TWidgetType,
  TCurPageLinksKey,
  TCMSContents,
} from '../spec'

import { SETTING_FIELD, BASEINFO_KEYS, SEO_KEYS, BROADCAST_KEYS } from '../constant'

import { NameAlias, LinkItem, InitSettings, settingsModalFields } from './Models'

/* eslint-disable-next-line */
const log = buildLog('S:DashboardThread')

// for local store, demo setting usage
const DASHBOARD_DEMO_KEY = 'dashboard_demo'

const DashboardThread = T.model('DashboardThread', {
  savingField: T.maybeNull(T.str),
  saving: T.opt(T.bool, false),
  loading: T.opt(T.bool, false),
  // tab
  curTab: T.opt(T.enum(values(DASHBOARD_ROUTE)), DASHBOARD_ROUTE.INFO),
  baseInfoTab: T.opt(T.enum(values(DASHBOARD_BASEINFO_ROUTE)), DASHBOARD_BASEINFO_ROUTE.BASIC),
  aliasTab: T.opt(T.enum(values(DASHBOARD_ALIAS_ROUTE)), DASHBOARD_ALIAS_ROUTE.GENERAL),
  seoTab: T.opt(T.enum(values(DASHBOARD_SEO_ROUTE)), DASHBOARD_SEO_ROUTE.SEARCH_ENGINE),
  docTab: T.opt(T.enum(values(DASHBOARD_DOC_ROUTE)), DASHBOARD_DOC_ROUTE.TABLE),
  layoutTab: T.opt(T.enum(values(DASHBOARD_LAYOUT_ROUTE)), DASHBOARD_LAYOUT_ROUTE.GLOBAL),
  broadcastTab: T.opt(T.enum(values(DASHBOARD_BROADCAST_ROUTE)), DASHBOARD_BROADCAST_ROUTE.GLOBAL),

  // editing
  editingTag: T.maybeNull(Tag),
  settingTag: T.maybeNull(Tag),
  editingAlias: T.maybeNull(NameAlias),
  editingLink: T.maybeNull(LinkItem),
  editingLinkMode: T.opt(T.enum(values(CHANGE_MODE)), CHANGE_MODE.CREATE),

  editingGroup: T.maybeNull(T.str),
  editingGroupIndex: T.maybeNull(T.int),
  // editingGroupMode: T.opt(T.enum(values(CHANGE_MODE)), CHANGE_MODE.CREATE),

  ...settingsModalFields,
  initSettings: T.opt(InitSettings, {}),
  defaultSettings: T.opt(InitSettings, {}),

  // cms
  batchSelectedIDs: T.opt(T.array(T.str), []),
  pagedPosts: T.opt(PagedPosts, emptyPagi),
  pagedDocs: T.opt(PagedDocs, emptyPagi),
  pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),

  // for global alert
  demoAlertEnable: T.opt(T.bool, false),
})
  .views((self) => ({
    get globalLayout(): TGlobalLayout {
      const slf = self as TStore
      const { initSettings } = slf
      const {
        primaryColor,
        changelogLayout,
        postLayout,
        kanbanLayout,
        kanbanBgColors,
        docLayout,
        docFaqLayout,
        headerLayout,
        footerLayout,
        bannerLayout,
        topbarLayout,
        topbarBg,

        broadcastLayout,
        broadcastBg,
        broadcastEnable,

        broadcastArticleLayout,
        broadcastArticleBg,
        broadcastArticleEnable,

        brandLayout,
        avatarLayout,
        enable,
      } = initSettings

      return {
        primaryColor,
        brand: brandLayout,
        avatar: avatarLayout,
        post: postLayout,
        kanban: kanbanLayout,
        kanbanBgColors: kanbanBgColors as TColorName[],
        doc: docLayout,
        docFaq: docFaqLayout,
        header: headerLayout,
        footer: footerLayout,
        changelog: changelogLayout,
        banner: bannerLayout,
        topbar: topbarLayout,
        topbarBg,

        broadcast: broadcastLayout,
        broadcastBg,
        broadcastEnable,

        broadcastArticle: broadcastArticleLayout,
        broadcastArticleBg,
        broadcastArticleEnable,

        enable,
      }
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },

    get cmsContents(): TCMSContents {
      const slf = self as TStore
      const { batchSelectedIDs, docTab } = slf
      const _batchSelectedIds = toJS(batchSelectedIDs)
      const _pagedPosts = toJS(slf.pagedPosts)
      const _pagedDocs = toJS(slf.pagedDocs)
      const _pagedChangelogs = toJS(slf.pagedChangelogs)

      const _postsEntries = _pagedPosts.entries.map((article) => ({
        ...article,
        _checked: includes(article.id, _batchSelectedIds),
      }))

      const _docsEntries = _pagedDocs.entries.map((article) => ({
        ...article,
        _checked: includes(article.id, _batchSelectedIds),
      }))

      const _changelogsEntries = _pagedChangelogs.entries.map((article) => ({
        ...article,
        _checked: includes(article.id, _batchSelectedIds),
      }))

      return {
        loading: slf.loading,
        docTab,
        batchSelectedIDs: _batchSelectedIds,
        pagedPosts: {
          ..._pagedPosts,
          entries: _postsEntries,
        },
        pagedDocs: {
          ..._pagedDocs,
          entries: _docsEntries,
        },
        pagedChangelogs: {
          ..._pagedChangelogs,
          entries: _changelogsEntries,
        },
      }
    },

    get _tagsIndexTouched(): boolean {
      const { tags, initSettings } = self

      return JSON.stringify(toJS(tags)) !== JSON.stringify(toJS(initSettings.tags))
    },
    get _socialLinksTouched(): boolean {
      const { socialLinks, initSettings } = self

      return JSON.stringify(toJS(socialLinks)) !== JSON.stringify(toJS(initSettings.socialLinks))
    },
    get touched(): TTouched {
      const slf = self as TStore

      const { initSettings: init, _tagsIndexTouched, _socialLinksTouched } = slf

      const _isChanged = (field: TSettingField): boolean => !equals(slf[field], init[field])
      const _anyChanged = (fields: TSettingField[]): boolean => any(_isChanged)(fields)

      const primaryColorTouched = _isChanged('primaryColor')
      const brandLayoutTouched = _isChanged('brandLayout')
      const avatarTouched = _isChanged('avatarLayout')

      const bannerLayoutTouched = _isChanged('bannerLayout')
      const postLayoutTouched = _isChanged('postLayout')
      const kanbanLayoutTouched = _isChanged('kanbanLayout')
      const kanbanBgColorsTouched = _isChanged('kanbanBgColors')
      const docLayoutTouched = _isChanged('docLayout')
      const docFaqLayoutTouched = _isChanged('docFaqLayout')

      const broadcastLayoutTouched = _isChanged('broadcastLayout')
      const broadcastBgTouched = _isChanged('broadcastBg')

      const broadcastArticleLayoutTouched = _isChanged('broadcastArticleLayout')
      const broadcastArticleBgTouched = _isChanged('broadcastArticleBg')

      const topbarLayoutTouched = _isChanged('topbarLayout')
      const topbarBgTouched = _isChanged('topbarBg')
      const changelogLayoutTouched = _isChanged('changelogLayout')
      const footerLayoutTouched = _isChanged('footerLayout')
      const headerLayoutTouched = _isChanged('headerLayout')

      const glowFixedTouched = _isChanged('glowFixed')
      const glowTypeTouched = _isChanged('glowType')
      const glowOpacityTouched = _isChanged('glowOpacity')

      const nameAliasTouched = !isNil(slf.editingAlias)
      const tagsTouched = !isNil(slf.editingTag)

      const rssFeedTypeTouched = _isChanged('rssFeedType')
      const rssFeedCountTouched = _isChanged('rssFeedCount')

      const widgetsPrimaryColorTouched = _isChanged('widgetsPrimaryColor')
      const widgetsSizeTouched = _isChanged('widgetsSize')

      const widgetsThreadsTouched = !equals(
        toJS(slf.widgetsThreads).sort(),
        toJS(init.widgetsThreads).sort(),
      )

      return {
        primaryColor: primaryColorTouched,
        brandLayout: brandLayoutTouched,
        avatarLayout: avatarTouched,
        bannerLayout: bannerLayoutTouched,
        topbarLayout: topbarLayoutTouched,
        topbarBg: topbarBgTouched,

        postLayout: postLayoutTouched,
        footerLayout: footerLayoutTouched,
        headerLayout: headerLayoutTouched,
        kanbanLayout: kanbanLayoutTouched,
        kanbanBgColors: kanbanBgColorsTouched,
        docLayout: docLayoutTouched,
        docFaqLayout: docFaqLayoutTouched,
        changelogLayout: changelogLayoutTouched,
        nameAlias: nameAliasTouched,
        tags: tagsTouched,
        tagsIndex: _tagsIndexTouched,
        socialLinks: _socialLinksTouched,

        glowFixed: glowFixedTouched,
        glowType: glowTypeTouched,
        glowOpacity: glowOpacityTouched,

        rssFeed: rssFeedTypeTouched || rssFeedCountTouched,

        widgetsPrimaryColor: widgetsPrimaryColorTouched,
        widgetsThreads: widgetsThreadsTouched,
        widgetsSize: widgetsSizeTouched,

        //
        baseInfo: _anyChanged(BASEINFO_KEYS as TSettingField[]),
        seo: _anyChanged(SEO_KEYS as TSettingField[]),

        // sidebar-item
        ui:
          primaryColorTouched ||
          brandLayoutTouched ||
          bannerLayoutTouched ||
          topbarLayoutTouched ||
          topbarBgTouched ||
          postLayoutTouched ||
          kanbanLayoutTouched ||
          changelogLayoutTouched ||
          glowFixedTouched ||
          glowTypeTouched ||
          glowOpacityTouched ||
          headerLayoutTouched ||
          footerLayoutTouched,

        widgets: widgetsPrimaryColorTouched || widgetsThreadsTouched || widgetsSizeTouched,
        broadcast:
          broadcastLayoutTouched ||
          broadcastBgTouched ||
          broadcastArticleLayoutTouched ||
          broadcastArticleBgTouched,
        broadcastArticle: broadcastArticleLayoutTouched || broadcastArticleBgTouched,
      }
    },

    get enableSettings(): TEnableConfig {
      const slf = self as TStore

      return toJS(slf.enable)
    },

    get tagGroups(): string[] {
      const slf = self as TStore
      const tags = toJS(slf.tags)

      // @ts-ignore
      return uniq(pluck('group', tags))
    },

    get tagSettings(): TTagSettings {
      const slf = self as TStore
      const tags = toJS(slf.tags)

      const { activeTagGroup, activeTagThread, curCommunity, nameAlias } = slf

      const filterdTagsByGroup =
        activeTagGroup === null ? tags : filter((t: TTag) => t.group === activeTagGroup, tags)

      const filterdTags = filter(
        (t: TTag) => t.thread === toUpper(activeTagThread || ''),
        filterdTagsByGroup,
      )

      const mappedThreads = curCommunity.threads.map((pThread) => {
        const aliasItem = find(propEq('slug', pThread.slug))(nameAlias) as TNameAliasConfig

        return {
          ...pThread,
          title: aliasItem?.name || pThread.title,
        }
      })

      const curThreads = reject(
        // @ts-ignore
        (thread) => includes(thread.slug, [THREAD.ABOUT, THREAD.DOC]),
        mappedThreads,
      )

      return {
        editingTag: toJS(slf.editingTag),
        settingTag: toJS(slf.settingTag),
        tags: filterdTags,
        saving: slf.saving,
        groups: toJS(slf.tagGroups),
        activeTagThread,
        activeTagGroup,
        threads: curThreads,
      }
    },

    get rssSettings(): TRSSSettings {
      const slf = self as TStore
      return {
        feedType: slf.rssFeedType,
        feedCount: slf.rssFeedCount,
        saving: slf.saving,
      }
    },

    get curPageLinksKey(): TCurPageLinksKey {
      const slf = self as TStore

      const isFooter = slf.curTab === DASHBOARD_ROUTE.FOOTER

      return {
        links: isFooter ? 'footerLinks' : 'headerLinks',
        settings: isFooter ? 'footerSettings' : 'headerSettings',
      }
    },

    get headerSettings(): THeaderSettings {
      const slf = self as TStore
      const {
        headerLayout,
        headerLinks,
        editingLink,
        editingLinkMode,
        editingGroup,
        editingGroupIndex,
        enableSettings,
        curCommunity,
        aliasSettings,
      } = slf

      return {
        headerLayout: toJS(headerLayout),
        headerLinks: toJS(headerLinks),
        editingLink: toJS(editingLink),
        saving: slf.saving,
        editingLinkMode: editingLinkMode as TChangeMode,
        editingGroup,
        editingGroupIndex,
        threads: washThreads(curCommunity.threads, {
          enable: enableSettings,
          nameAlias: aliasSettings.nameAlias,
        }),
      }
    },

    get footerSettings(): TFooterSettings {
      const slf = self as TStore
      const {
        footerLayout,
        footerLinks,
        editingLink,
        editingLinkMode,
        editingGroup,
        editingGroupIndex,
        enableSettings,
        curCommunity,
        aliasSettings,
      } = slf

      return {
        footerLayout: toJS(footerLayout),
        footerLinks: toJS(footerLinks),
        editingLink: toJS(editingLink),
        saving: slf.saving,
        editingLinkMode: editingLinkMode as TChangeMode,
        editingGroup,
        editingGroupIndex,
        threads: washThreads(curCommunity.threads, {
          enable: enableSettings,
          nameAlias: aliasSettings.nameAlias,
        }),
      }
    },

    get docSettings(): TDocSettings {
      const slf = self as TStore

      return {
        categories: toJS(slf.docCategories),
      }
    },

    get aliasSettings(): TAliasSettings {
      const slf = self as TStore

      return {
        aliasTab: slf.aliasTab,
        editingAlias: toJS(slf.editingAlias),
        nameAlias: toJS(slf.nameAlias),
        saving: slf.saving,
      }
    },

    get seoSettings(): TSEOSettings {
      const slf = self as TStore

      return {
        ...pick(SEO_KEYS, slf),
        saving: slf.saving,
        seoTab: slf.seoTab,
      }
    },

    get baseInfoSettings(): TBaseInfoSettings {
      const slf = self as TStore

      const baseInfo = pick(BASEINFO_KEYS, slf)

      return {
        ...baseInfo,
        baseInfoTab: slf.baseInfoTab,
        saving: slf.saving,
        socialLinks: toJS(slf.socialLinks),
      }
    },
    get uiSettings(): TUiSettings {
      const slf = self as TStore
      const root = getParent(self) as TRootStore

      const {
        wallpaperEditor: { wallpapers, wallpaper, customWallpaper, hasShadow },
      } = root

      // @ts-ignore
      return {
        wallpaperInfo: {
          customWallpaper: toJS(customWallpaper),
          wallpaper,
          wallpapers,
          hasShadow,
        },
        kanbanBgColors: toJS(slf.kanbanBgColors) as TColorName[],
        ...pick(
          [
            'saving',
            'layoutTab',
            'primaryColor',
            'brandLayout',
            'avatarLayout',
            'bannerLayout',
            'topbarLayout',
            'topbarBg',
            'postLayout',
            'kanbanLayout',
            'docLayout',
            'docFaqLayout',
            'changelogLayout',
            'glowFixed',
            'glowType',
            'glowOpacity',
          ],
          slf,
        ),
      }
    },

    get broadcastSettings(): TBroadcastSettings {
      const slf = self as TStore

      return {
        ...pick(BROADCAST_KEYS, slf),
        saving: slf.saving,
      }
    },

    get widgetsSettings(): TWidgetsSettings {
      const slf = self as TStore

      return {
        saving: slf.saving,
        widgetsPrimaryColor: slf.widgetsPrimaryColor,
        widgetsThreads: toJS(slf.widgetsThreads) as TThread[],
        widgetsSize: slf.widgetsSize as TSizeSML,
        widgetsType: slf.widgetsType as TWidgetType,
      }
    },
  }))
  .actions((self) => ({
    afterCreate(): void {
      const slf = self as TStore

      slf._initActiveTagThreadIfneed()

      if (!slf._loadLocalSettings()) {
        slf.mark({ demoAlertEnable: false })
      }
    },

    /**
     * init activeTagThread for dashboard tags settings
     * based on enableSettings
     */
    _initActiveTagThreadIfneed(): void {
      const slf = self as TStore
      const { curTab, enableSettings } = slf

      if (curTab !== DASHBOARD_ROUTE.TAGS) return

      if (enableSettings.post) {
        setTimeout(() => slf.mark({ activeTagThread: THREAD.POST }))
      } else if (enableSettings.kanban) {
        setTimeout(() => slf.mark({ activeTagThread: THREAD.KANBAN }))
      } else if (enableSettings.changelog) {
        setTimeout(() => slf.mark({ activeTagThread: THREAD.CHANGELOG }))
      } else {
        setTimeout(() => slf.mark({ activeTagThread: null }))
      }
    },

    clearLocalSettings(): void {
      BStore.remove(DASHBOARD_DEMO_KEY)

      const slf = self as TStore
      const curSlfObj = toJS(slf)

      mapObjIndexed((value, key) => {
        if (!equals(curSlfObj[key], curSlfObj.defaultSettings[key])) {
          if (key !== 'defaultSettings' && key !== 'initSettings') {
            slf.mark({ [key]: value })
          }
        }
      }, curSlfObj.defaultSettings)

      slf.mark({ demoAlertEnable: false, saving: false, initSettings: curSlfObj.defaultSettings })
    },

    _loadLocalSettings(): boolean {
      const slf = self as TStore
      const dashboardDemoSettings = BStore.get(DASHBOARD_DEMO_KEY)

      if (dashboardDemoSettings) {
        const settingsObj = JSON.parse(dashboardDemoSettings)
        const curSlfObj = toJS(slf)

        setTimeout(() => {
          mapObjIndexed((value, key) => {
            if (!equals(curSlfObj[key], settingsObj[key])) {
              slf.mark({ [key]: value })
            }
          }, settingsObj)

          slf.mark({ saving: false, initSettings: settingsObj, demoAlertEnable: true })
        })
        return true
      }

      return false
    },

    /** it also maybe called by landing page */
    changeGlowEffect(glowType: string): void {
      const slf = self as TStore
      slf.glowType = glowType
    },
    /**
     * this is for mutation params after on save
     */
    onSave(field: TSettingField): void {
      const slf = self as TStore

      if (field === SETTING_FIELD.TAG) {
        const { editingTag } = slf
        const targetIdx = slf._findTagIdx()
        if (targetIdx < 0) return

        slf.tags[targetIdx] = clone(toJS(editingTag))
      }

      if (field === SETTING_FIELD.NAME_ALIAS) {
        const { editingAlias } = slf

        const targetIdx = slf._findAliasIdx()
        if (targetIdx < 0) return

        slf.nameAlias[targetIdx] = clone(toJS(editingAlias))
      }
    },

    // save to local settings should omit subTabs,
    // otherwise it will be choas when save one one tab then switch to other tab
    _saveToLocal(): void {
      const slf = self as TStore
      const saveSlf = omit(
        ['curTab', 'baseInfoTab', 'aliasTab', 'layoutTab', 'layoutTab', 'broadcastTab'],
        toJS(slf),
      )

      BStore.set(DASHBOARD_DEMO_KEY, JSON.stringify(saveSlf))
    },

    rollbackEdit(field: TSettingField): void {
      const slf = self as TStore

      if (field === SETTING_FIELD.BASE_INFO) {
        for (let i = 0; i < BASEINFO_KEYS.length; i += 1) {
          const key = BASEINFO_KEYS[i]
          const initValue = slf.initSettings[key]
          if (self[key] !== initValue) {
            // @ts-ignore
            self[key] = initValue
          }
        }

        return
      }

      if (field === SETTING_FIELD.SEO) {
        for (let i = 0; i < SEO_KEYS.length; i += 1) {
          const key = SEO_KEYS[i]
          const initValue = slf.initSettings[key]
          if (self[key] !== initValue) {
            // @ts-ignore
            self[key] = initValue
          }
        }

        return
      }

      if (field === SETTING_FIELD.TAG) {
        const targetIdx = slf._findTagIdx()
        if (targetIdx < 0) return

        slf.tags[targetIdx] = toJS(slf.tags[targetIdx])
        slf.editingTag = null
        return
      }

      if (field === SETTING_FIELD.TAG_INDEX) {
        self.tags = toJS(self.initSettings.tags)
        return
      }

      if (field === SETTING_FIELD.NAME_ALIAS) {
        const targetIdx = slf._findAliasIdx()
        if (targetIdx < 0) return

        slf.nameAlias[targetIdx] = toJS(slf.nameAlias[targetIdx])
        slf.editingAlias = null
        return
      }

      const initValue = toJS(slf.initSettings[field])
      // @ts-ignore
      self[field] = initValue
    },

    resetEdit(field: TSettingField): void {
      const slf = self as TStore

      if (field === SETTING_FIELD.NAME_ALIAS) {
        const targetIdx = slf._findAliasIdx()
        if (targetIdx < 0) return

        slf.nameAlias[targetIdx].name = slf.nameAlias[targetIdx].original
        slf.editingAlias = null
      }

      slf._saveToLocal()
      // slf.mark({ demoAlertEnable: true })
    },

    _findTagIdx(): number {
      const slf = self as TStore

      const { tags, editingTag } = slf
      const targetIdx = findIndex((item: TTag) => item.id === editingTag.id, toJS(tags))
      return targetIdx
    },

    _findAliasIdx(): number {
      const slf = self as TStore

      const { nameAlias, editingAlias } = slf
      const targetIdx = findIndex(
        (item: TNameAlias) => item.slug === editingAlias.slug,
        toJS(nameAlias),
      )

      return targetIdx
    },

    updateEditing(sobj): void {
      const slf = self as TStore
      slf.mark(sobj)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof DashboardThread>

export default DashboardThread
