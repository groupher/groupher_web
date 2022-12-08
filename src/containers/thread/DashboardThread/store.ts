/*
 * DashboardThread store
 */

import { keys, values, pick, findIndex, clone, isNil, equals } from 'ramda'

import type { TCommunity, TRootStore, TTag, TGlobalLayout, TThread, TSizeSML } from '@/spec'
import { mockTags } from '@/utils/mock'

import {
  BRAND_LAYOUT,
  BANNER_LAYOUT,
  BANNER_NOTIFY_LAYOUT,
  CHANGELOG_LAYOUT,
  POST_LAYOUT,
  COLORS,
  THREAD,
  SIZE,
} from '@/constant'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'
import { Tag } from '@/model'

import type {
  TUiSettings,
  TTagSettings,
  TAliasSettings,
  TTouched,
  TSettingField,
  TAlias,
  TWidgetsSettings,
  TWidgetType,
} from './spec'

import { TAB, SETTING_FIELD, BUILDIN_ALIAS, WIDGET_TYPE } from './constant'

/* eslint-disable-next-line */
const log = buildLog('S:DashboardThread')

const Alias = T.model('Alias', {
  raw: T.opt(T.string, ''),
  name: T.opt(T.string, ''),
  original: T.opt(T.string, ''),
  suggestions: T.opt(T.array(T.string), []),
})

const settingsModalFields = {
  primaryColor: T.opt(T.enum(keys(COLORS)), 'BLACK'),
  postLayout: T.opt(T.enum(values(POST_LAYOUT)), POST_LAYOUT.UPVOTE_FIRST),
  brandLayout: T.opt(T.enum(values(BRAND_LAYOUT)), BRAND_LAYOUT.BOTH),
  bannerLayout: T.opt(T.enum(values(BANNER_LAYOUT)), BANNER_LAYOUT.HEADER),
  bannerNotifyLayout: T.opt(T.enum(values(BANNER_NOTIFY_LAYOUT)), BANNER_NOTIFY_LAYOUT.DEFAULT),
  bannerNotifyBg: T.opt(T.enum(keys(COLORS)), 'BLACK'),
  changelogLayout: T.opt(T.enum(values(CHANGELOG_LAYOUT)), CHANGELOG_LAYOUT.PREVIEW),
  tags: T.opt(T.array(Tag), mockTags(12)),
  alias: T.opt(T.array(Alias), BUILDIN_ALIAS),

  // widgets
  widgetsPrimaryColor: T.opt(T.enum(keys(COLORS)), 'BLACK'),
  widgetsThreads: T.opt(T.array(T.string), [THREAD.POST, THREAD.KANBAN, THREAD.CHANGELOG]),
  widgetsSize: T.opt(T.enum([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE]), SIZE.MEDIUM),
  widgetsType: T.opt(T.enum(values(WIDGET_TYPE)), WIDGET_TYPE.SIDEBAR),
}

const InitSettings = T.model('DashboardInit', settingsModalFields)

const DashboardThread = T.model('DashboardThread', {
  saving: T.opt(T.bool, false),
  curTab: T.opt(T.enum(values(TAB)), TAB.UI),
  editingTag: T.maybeNull(Tag),
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
        bannerLayout,
        bannerNotifyLayout,
        bannerNotifyBg,
        brandLayout,
      } = initSettings

      return {
        primaryColor,
        brand: brandLayout,
        post: postLayout,
        changelog: changelogLayout,
        banner: bannerLayout,
        bannerNotify: bannerNotifyLayout,
        bannerNotifyBg,
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
      const bannerNotifyBgTouched = _isChanged('bannerNotifyBg')
      const postLayoutTouched = _isChanged('postLayout')
      const bannerNotifyLayoutTouched = _isChanged('bannerNotifyLayout')
      const changelogLayoutTouched = _isChanged('changelogLayout')

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
        bannerNotifyLayout: bannerNotifyLayoutTouched,
        bannerNotifyBg: bannerNotifyBgTouched,
        postLayout: postLayoutTouched,
        changelogLayout: changelogLayoutTouched,
        alias: aliasTouched,
        tags: tagsTouched,

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
          postLayoutTouched ||
          changelogLayoutTouched,

        widgets: widgetsPrimaryColorTouched || widgetsThreadsTouched || widgetsSizeTouched,
      }
    },

    get tagSettings(): TTagSettings {
      const slf = self as TStore

      return {
        editingTag: toJS(slf.editingTag),
        tags: toJS(slf.tags),
        saving: slf.saving,
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
        wallpaperEditor: { wallpapers, wallpaper },
      } = root

      return {
        wallpaper: wallpapers[wallpaper],
        ...pick(
          [
            'saving',
            'primaryColor',
            'brandLayout',
            'bannerLayout',
            'bannerNotifyLayout',
            'bannerNotifyBg',
            'postLayout',
            'changelogLayout',
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
