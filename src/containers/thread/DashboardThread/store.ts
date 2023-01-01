/*
 * DashboardThread store
 */

import { keys, values, pick, findIndex, clone, isNil, equals, pluck, uniq, filter } from 'ramda'

import type {
  TCommunity,
  TRootStore,
  TTag,
  TGlobalLayout,
  TThread,
  TSizeSML,
  TFileTreeDirection,
} from '@/spec'
import { mockTags } from '@/utils/mock'

import {
  BRAND_LAYOUT,
  BANNER_LAYOUT,
  TOPBAR_LAYOUT,
  BANNER_NOTIFY_LAYOUT,
  CHANGELOG_LAYOUT,
  POST_LAYOUT,
  KANBAN_LAYOUT,
  COLORS,
  THREAD,
  SIZE,
  HELP_LAYOUT,
  COLOR_NAME,
  ROUTE,
  GLOW_EFFECTS,
} from '@/constant'

import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'
import { Tag } from '@/model'

import type {
  TUiSettings,
  TTagSettings,
  THelpSettings,
  TAliasSettings,
  TTouched,
  TSettingField,
  TAlias,
  TWidgetsSettings,
  TWidgetType,
} from './spec'

import { SETTING_FIELD, BUILDIN_ALIAS, WIDGET_TYPE } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:DashboardThread')

const Alias = T.model('Alias', {
  raw: T.opt(T.string, ''),
  name: T.opt(T.string, ''),
  original: T.opt(T.string, ''),
  suggestions: T.opt(T.array(T.string), []),
})

const File = T.model('File', {
  index: T.int,
  name: T.str,
  articleId: T.opt(T.str, ''),
  linkAddr: T.opt(T.str, ''),
})

const GroupCategory = T.model('GroupGategory', {
  name: T.opt(T.str, ''),
  index: T.int,
  color: T.opt(T.enum(values(COLOR_NAME)), COLOR_NAME.BLACK),
  files: T.opt(T.array(File), []),
})

const settingsModalFields = {
  primaryColor: T.opt(T.enum(keys(COLORS)), 'BLACK'),
  postLayout: T.opt(T.enum(values(POST_LAYOUT)), POST_LAYOUT.UPVOTE_FIRST),
  kanbanLayout: T.opt(T.enum(values(KANBAN_LAYOUT)), KANBAN_LAYOUT.SIMPLE),
  helpLayout: T.opt(T.enum(values(HELP_LAYOUT)), HELP_LAYOUT.FULL),
  brandLayout: T.opt(T.enum(values(BRAND_LAYOUT)), BRAND_LAYOUT.BOTH),
  bannerLayout: T.opt(T.enum(values(BANNER_LAYOUT)), BANNER_LAYOUT.HEADER),
  topbarLayout: T.opt(T.enum(values(TOPBAR_LAYOUT)), TOPBAR_LAYOUT.YES),
  topbarBg: T.opt(T.enum(keys(COLORS)), 'BLACK'),
  bannerNotifyLayout: T.opt(T.enum(values(BANNER_NOTIFY_LAYOUT)), BANNER_NOTIFY_LAYOUT.DEFAULT),
  bannerNotifyBg: T.opt(T.enum(keys(COLORS)), 'BLACK'),
  changelogLayout: T.opt(T.enum(values(CHANGELOG_LAYOUT)), CHANGELOG_LAYOUT.PREVIEW),

  // help
  helpCategories: T.opt(T.array(GroupCategory), []),

  // glow effect
  glowType: T.opt(T.string, keys(GLOW_EFFECTS)[0]),
  glowFixed: T.opt(T.bool, true),

  // tags
  tags: T.opt(T.array(Tag), mockTags(12)),
  activeTagCategory: T.maybeNull(T.string),
  //
  alias: T.opt(T.array(Alias), BUILDIN_ALIAS),
  fileTreeDirection: T.opt(T.enum(['left', 'right']), 'left'),

  // widgets
  widgetsPrimaryColor: T.opt(T.enum(keys(COLORS)), 'BLACK'),
  widgetsThreads: T.opt(T.array(T.string), [THREAD.POST, THREAD.KANBAN, THREAD.CHANGELOG]),
  widgetsSize: T.opt(T.enum([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE]), SIZE.MEDIUM),
  widgetsType: T.opt(T.enum(values(WIDGET_TYPE)), WIDGET_TYPE.SIDEBAR),
}

const InitSettings = T.model('DashboardInit', settingsModalFields)

const DashboardThread = T.model('DashboardThread', {
  saving: T.opt(T.bool, false),
  curTab: T.opt(T.enum(values(ROUTE.DASHBOARD)), ROUTE.DASHBOARD.INFO),
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
        helpLayout,
        bannerLayout,
        topbarLayout,
        topbarBg,
        bannerNotifyLayout,
        bannerNotifyBg,
        fileTreeDirection,
        brandLayout,
      } = initSettings

      return {
        primaryColor,
        brand: brandLayout,
        post: postLayout,
        kanban: kanbanLayout,
        help: helpLayout,
        changelog: changelogLayout,
        banner: bannerLayout,
        topbar: topbarLayout,
        topbarBg,
        bannerNotify: bannerNotifyLayout,
        bannerNotifyBg,
        fileTreeDirection: fileTreeDirection as TFileTreeDirection,
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

      const bannerLayoutTouched = _isChanged('bannerLayout')
      const fileTreeDirectionTouched = _isChanged('fileTreeDirection')
      const postLayoutTouched = _isChanged('postLayout')
      const kanbanLayoutTouched = _isChanged('kanbanLayout')
      const helpLayoutTouched = _isChanged('helpLayout')
      const bannerNotifyLayoutTouched = _isChanged('bannerNotifyLayout')
      const bannerNotifyBgTouched = _isChanged('bannerNotifyBg')
      const topbarLayoutTouched = _isChanged('topbarLayout')
      const topbarBgTouched = _isChanged('topbarBg')
      const changelogLayoutTouched = _isChanged('changelogLayout')

      const glowFixedTouched = _isChanged('glowFixed')
      const glowTypeTouched = _isChanged('glowType')

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
        bannerLayout: bannerLayoutTouched,
        topbarLayout: topbarLayoutTouched,
        topbarBg: topbarBgTouched,
        bannerNotifyLayout: bannerNotifyLayoutTouched,
        bannerNotifyBg: bannerNotifyBgTouched,
        fileTreeDirection: fileTreeDirectionTouched,
        postLayout: postLayoutTouched,
        kanbanLayout: kanbanLayoutTouched,
        helpLayout: helpLayoutTouched,
        changelogLayout: changelogLayoutTouched,
        alias: aliasTouched,
        tags: tagsTouched,

        glowFixed: glowFixedTouched,
        glowType: glowTypeTouched,

        widgetsPrimaryColor: widgetsPrimaryColorTouched,
        widgetsThreads: widgetsThreadsTouched,
        widgetsSize: widgetsSizeTouched,

        // sidebar-item
        ui:
          primaryColorTouched ||
          brandLayoutTouched ||
          bannerLayoutTouched ||
          bannerNotifyLayoutTouched ||
          bannerNotifyBgTouched ||
          topbarLayoutTouched ||
          topbarBgTouched ||
          fileTreeDirectionTouched ||
          postLayoutTouched ||
          kanbanLayoutTouched ||
          changelogLayoutTouched ||
          glowFixedTouched ||
          glowTypeTouched,

        widgets: widgetsPrimaryColorTouched || widgetsThreadsTouched || widgetsSizeTouched,
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

    get uiSettings(): TUiSettings {
      const slf = self as TStore
      const root = getParent(self) as TRootStore

      const {
        wallpaperEditor: { wallpapers, wallpaper, hasShadow },
      } = root

      // @ts-ignore
      return {
        wallpaper: wallpapers[wallpaper],
        hasWallpaperShadow: hasShadow,
        ...pick(
          [
            'saving',
            'primaryColor',
            'brandLayout',
            'bannerLayout',
            'fileTreeDirection',
            'topbarLayout',
            'topbarBg',
            'bannerNotifyLayout',
            'bannerNotifyBg',
            'postLayout',
            'kanbanLayout',
            'helpLayout',
            'changelogLayout',
            'glowFixed',
            'glowType',
          ],
          slf,
        ),
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
