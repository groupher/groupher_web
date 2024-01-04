/*
 * DashboardThread store
 */

import {
  values,
  pick,
  isEmpty,
  findIndex,
  clone,
  equals,
  omit,
  pluck,
  update,
  uniq,
  reject,
  mapObjIndexed,
  forEach,
} from 'ramda'

import type {
  TCommunity,
  TRootStore,
  TTag,
  TEnableConfig,
  TNameAlias,
  TChangeMode,
  TSocialItem,
  TMediaReport,
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
import { buildLog } from '@/logger'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'
import { publicThreads } from '@/helper'

import {
  PagedCommunities,
  PagedPosts,
  PagedDocs,
  PagedChangelogs,
  Tag,
  emptyPagi,
  FAQSection,
  User,
} from '@/model'

import type {
  TOverview,
  TBaseInfoSettings,
  THeaderSettings,
  TFooterSettings,
  TDocSettings,
  TSettingField,
  TCurPageLinksKey,
} from '../spec'

import { SETTING_FIELD, BASEINFO_KEYS, SEO_KEYS } from '../constant'

import { NameAlias, LinkItem, InitSettings, settingsModalFields, Overview } from './Models'

const _log = buildLog('S:DashboardThread')

// for local store, demo setting usage
const DASHBOARD_DEMO_KEY = 'dashboard_demo'

const DashboardThread = T.model('DashboardThread', {
  savingField: T.maybeNull(T.str),
  saving: T.opt(T.bool, false),
  loading: T.opt(T.bool, false),
  // tab
  curTab: T.opt(T.enum(values(DASHBOARD_ROUTE)), DASHBOARD_ROUTE.INFO),
  baseInfoTab: T.opt(T.enum(values(DASHBOARD_BASEINFO_ROUTE)), DASHBOARD_BASEINFO_ROUTE.BASIC),
  aliasTab: T.opt(T.enum(values(DASHBOARD_ALIAS_ROUTE)), DASHBOARD_ALIAS_ROUTE.THREAD),
  seoTab: T.opt(T.enum(values(DASHBOARD_SEO_ROUTE)), DASHBOARD_SEO_ROUTE.SEARCH_ENGINE),
  docTab: T.opt(T.enum(values(DASHBOARD_DOC_ROUTE)), DASHBOARD_DOC_ROUTE.TABLE),
  layoutTab: T.opt(T.enum(values(DASHBOARD_LAYOUT_ROUTE)), DASHBOARD_LAYOUT_ROUTE.GLOBAL),
  broadcastTab: T.opt(T.enum(values(DASHBOARD_BROADCAST_ROUTE)), DASHBOARD_BROADCAST_ROUTE.GLOBAL),

  // overview
  overview: T.opt(Overview, {}),

  // editing
  editingTag: T.maybeNull(Tag),
  settingTag: T.maybeNull(Tag),
  editingAlias: T.maybeNull(NameAlias),
  editingLink: T.maybeNull(LinkItem),
  editingLinkMode: T.opt(T.enum(values(CHANGE_MODE)), CHANGE_MODE.CREATE),

  editingGroup: T.maybeNull(T.str),
  editingGroupIndex: T.maybeNull(T.int),
  editingFAQIndex: T.maybeNull(T.int),
  editingFAQ: T.maybeNull(FAQSection),

  queringMediaReportIndex: T.maybeNull(T.int),
  // editingGroupMode: T.opt(T.enum(values(CHANGE_MODE)), CHANGE_MODE.CREATE),

  ...settingsModalFields,
  initSettings: T.opt(InitSettings, {}),
  defaultSettings: T.opt(InitSettings, {}),

  // cms
  batchSelectedIDs: T.opt(T.array(T.str), []),
  pagedCommunities: T.opt(PagedCommunities, emptyPagi),
  pagedPosts: T.opt(PagedPosts, emptyPagi),
  pagedDocs: T.opt(PagedDocs, emptyPagi),
  pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),

  // for global alert
  demoAlertEnable: T.opt(T.bool, false),

  // for admins
  activeModerator: T.maybeNull(User),
  allModeratorRules: T.opt(T.str, '{}'),
  allRootRules: T.opt(T.str, '{}'),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get overviewData(): TOverview {
      return toJS(self.overview)
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
        nameAlias,
      } = slf

      return {
        saving: slf.saving,
        headerLayout: toJS(headerLayout),
        headerLinks: toJS(headerLinks),
        editingLink: toJS(editingLink),
        editingLinkMode: editingLinkMode as TChangeMode,
        editingGroup,
        editingGroupIndex,
        threads: publicThreads(curCommunity.threads, {
          enable: enableSettings,
          nameAlias,
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
        nameAlias,
      } = slf

      return {
        saving: slf.saving,
        footerLayout: toJS(footerLayout),
        // footerLinks: reject((item) => isEmpty(item.title), toJS(footerLinks)),
        footerLinks: toJS(footerLinks),
        editingLink: toJS(editingLink),
        editingLinkMode: editingLinkMode as TChangeMode,
        editingGroup,
        editingGroupIndex,
        threads: publicThreads(curCommunity.threads, {
          enable: enableSettings,
          nameAlias,
        }),
      }
    },

    get docSettings(): TDocSettings {
      const slf = self as TStore

      return {
        categories: toJS(slf.docCategories),
      }
    },

    get baseInfoSettings(): TBaseInfoSettings {
      const slf = self as TStore

      const baseInfo = pick(BASEINFO_KEYS, slf)
      const socialLinks = reject((item: TSocialItem) => isEmpty(item.type), toJS(slf.socialLinks))

      return {
        ...baseInfo,
        loading: slf.loading,
        queringMediaReportIndex: slf.queringMediaReportIndex,
        saving: slf.saving,
        baseInfoTab: slf.baseInfoTab,
        socialLinks,
        mediaReports: toJS(slf.mediaReports),
      }
    },
  }))
  .actions((self) => ({
    afterCreate(): void {
      // const slf = self as TStore
      // slf._initActiveTagThreadIfneed()
      // if (!slf._loadLocalSettings()) {
      //   slf.mark({ demoAlertEnable: false })
      // }
    },

    updateOverview(community: TCommunity): void {
      const { meta, views, subscribersCount } = community

      self.overview = {
        views,
        subscribersCount,
        ...meta,
      }
    },

    updateBaseInfo(community: TCommunity): void {
      const { dashboard } = community
      const { baseInfo, mediaReports } = dashboard

      forEach((key) => {
        self[key] = baseInfo[key]
        self.initSettings[key] = baseInfo[key]
      }, BASEINFO_KEYS)

      if (!isEmpty(mediaReports)) {
        const initMediaReports = mediaReports.map((item: TMediaReport, index) => ({
          ...item,
          editUrl: item.url,
          index: item.index || index,
        }))

        // @ts-ignore
        self.mediaReports = initMediaReports
        // @ts-ignore
        self.initSettings.mediaReports = initMediaReports
      }
    },

    setAllPassportRules(rootRules: string, moderatorRules): void {
      self.allRootRules = rootRules
      self.allModeratorRules = moderatorRules
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

    _rollbackByKeys(keys: string[]): void {
      const slf = self as TStore

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i]
        const initValue = slf.initSettings[key]
        if (self[key] !== initValue) {
          // @ts-ignore
          self[key] = initValue
        }
      }
    },

    rollbackEdit(field: TSettingField): void {
      const slf = self as TStore

      if (field === SETTING_FIELD.BASE_INFO) {
        slf._rollbackByKeys(BASEINFO_KEYS)
        return
      }

      if (field === SETTING_FIELD.SEO) {
        slf._rollbackByKeys(SEO_KEYS)
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

      if (field === SETTING_FIELD.FAQ_SECTIONS) {
        self.faqSections = toJS(self.initSettings.faqSections)
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

    updateViewingCommunity(args: TCommunity): void {
      const root = getParent(self) as TRootStore
      root.viewing.updateViewingCommunity(args)
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

    updateEditingTag() {
      const slf = self as TStore
      const { editingTag, tags } = slf

      const _editingTag = toJS(editingTag)
      const _tags = toJS(tags)
      const _initSettings = toJS(slf.initSettings)

      const targetIndex = findIndex((item: TTag) => item.id === editingTag.id, _tags)
      const updatedTags = update(targetIndex, _editingTag, _tags)

      const initSettings = { ..._initSettings, tags: updatedTags }
      slf.mark({ initSettings })
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
export const useStore = (): TStore => useMobxContext().store.dashboardThread

export default DashboardThread
