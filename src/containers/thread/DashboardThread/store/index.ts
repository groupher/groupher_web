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
  uniq,
  filter,
  mapObjIndexed,
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
} from '@/spec'

import {
  ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
} from '@/constant/route'

import BStore from '@/utils/bstore'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'
import { Tag } from '@/model'

import type {
  TBaseInfoSettings,
  TSEOSettings,
  TUiSettings,
  TTagSettings,
  TRSSSettings,
  TFooterSettings,
  THelpSettings,
  TAliasSettings,
  TTouched,
  TSettingField,
  TNameAlias,
  TWidgetsSettings,
  TBroadcastSettings,
  TWidgetType,
} from '../spec'

import { SETTING_FIELD } from '../constant'

import { NameAlias, settingsModalFields, InitSettings } from './Models'

/* eslint-disable-next-line */
const log = buildLog('S:DashboardThread')

// for local store, demo setting usage
const DASHBOARD_DEMO_KEY = 'dashboard_demo'

const DashboardThread = T.model('DashboardThread', {
  savingField: T.maybeNull(T.str),
  saving: T.opt(T.bool, false),
  // tab
  curTab: T.opt(T.enum(values(ROUTE.DASHBOARD)), ROUTE.DASHBOARD.INFO),
  baseInfoTab: T.opt(T.enum(values(DASHBOARD_BASEINFO_ROUTE)), DASHBOARD_BASEINFO_ROUTE.BASIC),
  aliasTab: T.opt(T.enum(values(DASHBOARD_ALIAS_ROUTE)), DASHBOARD_ALIAS_ROUTE.GENERAL),
  seoTab: T.opt(T.enum(values(DASHBOARD_SEO_ROUTE)), DASHBOARD_SEO_ROUTE.SEARCH_ENGINE),
  layoutTab: T.opt(T.enum(values(DASHBOARD_LAYOUT_ROUTE)), DASHBOARD_LAYOUT_ROUTE.GLOBAL),
  broadcastTab: T.opt(T.enum(values(DASHBOARD_BROADCAST_ROUTE)), DASHBOARD_BROADCAST_ROUTE.GLOBAL),

  // editing
  editingTag: T.maybeNull(Tag),
  settingTag: T.maybeNull(Tag),
  editingAlias: T.maybeNull(NameAlias),

  ...settingsModalFields,
  initSettings: T.opt(InitSettings, {}),
  defaultSettings: T.opt(InitSettings, {}),

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
        helpLayout,
        helpFaqLayout,
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
        help: helpLayout,
        helpFaq: helpFaqLayout,
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

    get touched(): TTouched {
      const slf = self as TStore

      const { initSettings: init } = slf

      const _isChanged = (field: TSettingField): boolean => {
        return !equals(slf[field], init[field])
      }

      const primaryColorTouched = _isChanged('primaryColor')
      const brandLayoutTouched = _isChanged('brandLayout')
      const avatarTouched = _isChanged('avatarLayout')

      const bannerLayoutTouched = _isChanged('bannerLayout')
      const postLayoutTouched = _isChanged('postLayout')
      const kanbanLayoutTouched = _isChanged('kanbanLayout')
      const kanbanBgColorsTouched = _isChanged('kanbanBgColors')
      const helpLayoutTouched = _isChanged('helpLayout')
      const helpFaqLayoutTouched = _isChanged('helpFaqLayout')

      const broadcastLayoutTouched = _isChanged('broadcastLayout')
      const broadcastBgTouched = _isChanged('broadcastBg')

      const broadcastArticleLayoutTouched = _isChanged('broadcastArticleLayout')
      const broadcastArticleBgTouched = _isChanged('broadcastArticleBg')

      const topbarLayoutTouched = _isChanged('topbarLayout')
      const topbarBgTouched = _isChanged('topbarBg')
      const changelogLayoutTouched = _isChanged('changelogLayout')
      const footerLayoutTouched = _isChanged('footerLayout')

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
        kanbanLayout: kanbanLayoutTouched,
        kanbanBgColors: kanbanBgColorsTouched,
        helpLayout: helpLayoutTouched,
        helpFaqLayout: helpFaqLayoutTouched,
        changelogLayout: changelogLayoutTouched,
        nameAlias: nameAliasTouched,
        tags: tagsTouched,

        glowFixed: glowFixedTouched,
        glowType: glowTypeTouched,
        glowOpacity: glowOpacityTouched,

        rssFeed: rssFeedTypeTouched || rssFeedCountTouched,

        widgetsPrimaryColor: widgetsPrimaryColorTouched,
        widgetsThreads: widgetsThreadsTouched,
        widgetsSize: widgetsSizeTouched,

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

    get tagCategories(): string[] {
      const slf = self as TStore
      const tags = toJS(slf.tags)

      // @ts-ignore
      return uniq(pluck('group', tags))
    },

    get tagSettings(): TTagSettings {
      const slf = self as TStore
      const tags = toJS(slf.tags)
      const { activeTagCategory } = slf

      const filterdTags =
        activeTagCategory === null ? tags : filter((t: TTag) => t.group === activeTagCategory, tags)

      return {
        editingTag: toJS(slf.editingTag),
        settingTag: toJS(slf.settingTag),
        tags: filterdTags,
        saving: slf.saving,
        categories: toJS(slf.tagCategories),
        activeTagCategory,
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

    get footerSettings(): TFooterSettings {
      const slf = self as TStore
      const { footerLayout, footerLinks } = slf

      return {
        footerLayout: toJS(footerLayout),
        footerLinks: toJS(footerLinks),
        saving: slf.saving,
      }
    },

    get helpSettings(): THelpSettings {
      const slf = self as TStore

      return {
        categories: toJS(slf.helpCategories),
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

      return pick(
        [
          'seoTab',
          'ogSiteName',
          'ogTitle',
          'ogDescription',
          'ogUrl',
          'ogImage',
          'ogLocale',
          'ogPublisher',

          'twTitle',
          'twDescription',
          'twUrl',
          'twCard',
          'twSite',
          'twImage',
          'twImageWidth',
          'twImageHeight',
        ],
        slf,
      )
    },

    get baseInfoSettings(): TBaseInfoSettings {
      const slf = self as TStore

      return pick(
        ['favicon', 'logo', 'title', 'desc', 'homepage', 'url', 'city', 'techstack', 'baseInfoTab'],
        slf,
      )
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
            'layoutTab',
            'saving',
            'primaryColor',
            'brandLayout',
            'avatarLayout',
            'bannerLayout',
            'topbarLayout',
            'topbarBg',
            'postLayout',
            'kanbanLayout',
            'helpLayout',
            'helpFaqLayout',
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

      return pick(
        [
          'saving',
          'broadcastTab',
          'broadcastLayout',
          'broadcastBg',
          'broadcastEnable',
          'broadcastArticleLayout',
          'broadcastArticleBg',
          'broadcastArticleEnable',
        ],
        slf,
      )
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

      if (!slf._loadLocalSettings()) {
        slf.mark({ demoAlertEnable: false })
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
    _clearEditingTag(): void {
      self.editingTag = null
    },
    onSave(field: TSettingField): void {
      const slf = self as TStore

      if (field === SETTING_FIELD.TAG) {
        const { editingTag } = slf
        const targetIdx = slf._findTagIdx()
        if (targetIdx < 0) return

        slf.tags[targetIdx] = clone(toJS(editingTag))
        // slf.editingTag = null
        setTimeout(() => {
          slf._clearEditingTag()
        })
      }

      if (field === SETTING_FIELD.NAME_ALIAS) {
        const { editingAlias } = slf

        const targetIdx = slf._findAliasIdx()
        if (targetIdx < 0) return

        slf.nameAlias[targetIdx] = clone(toJS(editingAlias))
        slf.editingAlias = null
      }

      // TODO: only for Guest user
      // slf._saveToLocal()
      // slf.mark({ demoAlertEnable: true })
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

      if (field === SETTING_FIELD.TAG) {
        const targetIdx = slf._findTagIdx()
        if (targetIdx < 0) return

        slf.tags[targetIdx] = toJS(slf.tags[targetIdx])
        slf.editingTag = null
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
        (item: TNameAlias) => item.raw === editingAlias.raw,
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
