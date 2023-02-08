/*
 * DashboardThread store
 */

import { values, pick, findIndex, clone, isNil, equals, pluck, uniq, filter } from 'ramda'

import type { TCommunity, TRootStore, TTag, TGlobalLayout, TThread, TSizeSML } from '@/spec'
import {
  ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
} from '@/constant/route'

import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'
import { Tag } from '@/model'

import type {
  TBaseInfoSettings,
  TSEOSettings,
  TUiSettings,
  TTagSettings,
  TFooterSettings,
  THelpSettings,
  TAliasSettings,
  TTouched,
  TSettingField,
  TAlias,
  TWidgetsSettings,
  TBroadcastSettings,
  TWidgetType,
} from '../spec'

import { SETTING_FIELD } from '../constant'

import { Alias, settingsModalFields, InitSettings } from './Models'

/* eslint-disable-next-line */
const log = buildLog('S:DashboardThread')

const DashboardThread = T.model('DashboardThread', {
  saving: T.opt(T.bool, false),
  curTab: T.opt(T.enum(values(ROUTE.DASHBOARD)), ROUTE.DASHBOARD.INFO),
  baseInfoTab: T.opt(T.enum(values(DASHBOARD_BASEINFO_ROUTE)), DASHBOARD_BASEINFO_ROUTE.BASIC),
  seoTab: T.opt(T.enum(values(DASHBOARD_SEO_ROUTE)), DASHBOARD_SEO_ROUTE.SEARCH_ENGINE),
  layoutTab: T.opt(T.enum(values(DASHBOARD_LAYOUT_ROUTE)), DASHBOARD_LAYOUT_ROUTE.GLOBAL),
  broadcastTab: T.opt(T.enum(values(DASHBOARD_BROADCAST_ROUTE)), DASHBOARD_BROADCAST_ROUTE.GLOBAL),
  editingTag: T.maybeNull(Tag),
  settingTag: T.maybeNull(Tag),
  editingAlias: T.maybeNull(Alias),

  ...settingsModalFields,
  initSettings: T.opt(InitSettings, {}),
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
      } = initSettings

      return {
        primaryColor,
        brand: brandLayout,
        avatar: avatarLayout,
        post: postLayout,
        kanban: kanbanLayout,
        kanbanBgColors,
        help: helpLayout,
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
        return slf[field] !== init[field]
      }

      const primaryColorTouched = _isChanged('primaryColor')
      const brandLayoutTouched = _isChanged('brandLayout')
      const avatarTouched = _isChanged('avatarLayout')

      const bannerLayoutTouched = _isChanged('bannerLayout')
      const postLayoutTouched = _isChanged('postLayout')
      const kanbanLayoutTouched = _isChanged('kanbanLayout')
      const helpLayoutTouched = _isChanged('helpLayout')

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

      const aliasTouched = !isNil(slf.editingAlias)
      const tagsTouched = !isNil(slf.editingTag)

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
        helpLayout: helpLayoutTouched,
        changelogLayout: changelogLayoutTouched,
        alias: aliasTouched,
        tags: tagsTouched,

        glowFixed: glowFixedTouched,
        glowType: glowTypeTouched,
        glowOpacity: glowOpacityTouched,

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

    get footerSettings(): TFooterSettings {
      const slf = self as TStore
      const { footerLayout } = slf

      return {
        footerLayout: toJS(footerLayout),
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
        editingAlias: toJS(slf.editingAlias),
        alias: toJS(slf.alias),
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
        kanbanBgColors: toJS(slf.kanbanBgColors),
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
    /** it also maybe called by landing page */
    changeGlowEffect(glowType: string): void {
      const slf = self as TStore
      slf.glowType = glowType
    },
    onSave(field: TSettingField): void {
      const slf = self as TStore

      if (field === SETTING_FIELD.TAG) {
        const { editingTag } = slf
        const targetIdx = slf._findTagIdx()
        if (targetIdx < 0) return

        slf.tags[targetIdx] = clone(toJS(editingTag))
        slf.editingTag = null
      }

      if (field === SETTING_FIELD.ALIAS) {
        const { editingAlias } = slf

        const targetIdx = slf._findAliasIdx()
        if (targetIdx < 0) return

        slf.alias[targetIdx] = clone(toJS(editingAlias))
        slf.editingAlias = null
      }
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

      if (field === SETTING_FIELD.ALIAS) {
        const targetIdx = slf._findAliasIdx()
        if (targetIdx < 0) return

        slf.alias[targetIdx] = toJS(slf.alias[targetIdx])
        slf.editingAlias = null
        return
      }

      const initValue = toJS(slf.initSettings[field])

      // @ts-ignore
      self[field] = initValue
    },

    resetEdit(field: TSettingField): void {
      const slf = self as TStore

      if (field === SETTING_FIELD.ALIAS) {
        const targetIdx = slf._findAliasIdx()
        if (targetIdx < 0) return

        slf.alias[targetIdx] = {
          ...slf.alias[targetIdx],
          name: slf.alias[targetIdx].original,
        }
        slf.editingAlias = null
      }
    },

    _findTagIdx(): number {
      const slf = self as TStore

      const { tags, editingTag } = slf
      const targetIdx = findIndex((item: TTag) => item.id === editingTag.id, toJS(tags))
      return targetIdx
    },

    _findAliasIdx(): number {
      const slf = self as TStore

      const { alias, editingAlias } = slf
      const targetIdx = findIndex((item: TAlias) => item.raw === editingAlias.raw, toJS(alias))

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
