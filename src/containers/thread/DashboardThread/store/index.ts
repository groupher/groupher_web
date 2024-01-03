/*
 * DashboardThread store
 */

import {
  values,
  pick,
  isEmpty,
  findIndex,
  clone,
  isNil,
  equals,
  omit,
  pluck,
  update,
  find,
  propEq,
  uniq,
  filter,
  reject,
  mapObjIndexed,
  includes,
  toUpper,
  any,
  forEach,
} from 'ramda'

import type {
  TCommunity,
  TRootStore,
  TTag,
  TGlobalLayout,
  TColorName,
  TEnableConfig,
  TNameAlias,
  TChangeMode,
  TArticleEntries,
  TSocialItem,
  TMediaReport,
  TModerator,
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
import { publicThreads, sortByIndex } from '@/helper'

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
  TSEOSettings,
  TTagSettings,
  TRSSSettings,
  THeaderSettings,
  TFooterSettings,
  TDocSettings,
  TTouched,
  TSettingField,
  TBroadcastSettings,
  TCurPageLinksKey,
  TCMSContents,
} from '../spec'

import { SETTING_FIELD, BASEINFO_KEYS, SEO_KEYS, BROADCAST_KEYS } from '../constant'

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
    get globalLayout(): TGlobalLayout {
      const slf = self as TStore
      const { initSettings: init } = slf

      return {
        primaryColor: init.primaryColor,
        brand: init.brandLayout,
        tag: init.tagLayout,
        avatar: init.avatarLayout,
        post: init.postLayout,
        kanban: init.kanbanCardLayout,
        kanbanBgColors: init.kanbanBgColors as TColorName[],
        doc: init.docLayout,
        docFaq: init.docFaqLayout,
        header: init.headerLayout,
        footer: init.footerLayout,
        changelog: init.changelogLayout,
        banner: init.bannerLayout,
        topbar: init.topbarLayout,
        topbarBg: init.topbarBg,

        broadcast: init.broadcastLayout,
        broadcastBg: init.broadcastBg,
        broadcastEnable: init.broadcastEnable,

        broadcastArticle: init.broadcastArticleLayout,
        broadcastArticleBg: init.broadcastArticleBg,
        broadcastArticleEnable: init.broadcastArticleEnable,

        enable: init.enable,
      }
    },
    get cmsContents(): TCMSContents {
      const slf = self as TStore
      const { batchSelectedIDs, docTab, editingFAQIndex } = slf
      const _batchSelectedIds = toJS(batchSelectedIDs)
      const _pagedCommunities = toJS(slf.pagedCommunities)
      const _pagedPosts = toJS(slf.pagedPosts)
      const _pagedDocs = toJS(slf.pagedDocs)
      const _pagedChangelogs = toJS(slf.pagedChangelogs)

      const faqSections = toJS(slf.faqSections)
      const editingFAQ = toJS(slf.editingFAQ)

      return {
        loading: slf.loading,
        docTab,
        editingFAQIndex,
        batchSelectedIDs: _batchSelectedIds,
        pagedCommunities: {
          ..._pagedCommunities,
          entries: slf._assignChecked(_pagedCommunities.entries),
        },
        pagedPosts: {
          ..._pagedPosts,
          entries: slf._assignChecked(_pagedPosts.entries),
        },
        pagedDocs: {
          ..._pagedDocs,
          entries: slf._assignChecked(_pagedDocs.entries),
        },
        pagedChangelogs: {
          ..._pagedChangelogs,
          entries: slf._assignChecked(_pagedChangelogs.entries),
        },

        faqSections,
        editingFAQ,
      }
    },

    get _tagsIndexTouched(): boolean {
      const { tags, initSettings } = self

      return (
        JSON.stringify(sortByIndex(toJS(tags), 'id')) !==
        JSON.stringify(sortByIndex(toJS(initSettings.tags), 'id'))
      )
    },
    get _socialLinksTouched(): boolean {
      const { socialLinks, initSettings } = self

      return JSON.stringify(toJS(socialLinks)) !== JSON.stringify(toJS(initSettings.socialLinks))
    },
    get _mediaReportsTouched(): boolean {
      const { mediaReports, initSettings } = self
      const curValues = reject((item: TMediaReport) => !item.editUrl, toJS(mediaReports))
      const initValues = reject(
        (item: TMediaReport) => !item.editUrl,
        toJS(initSettings.mediaReports),
      )

      const curValueTitles = filter((item: TMediaReport) => !isEmpty(item?.title), curValues)
      const isCurAllvalid =
        curValueTitles.length !== 0 && curValueTitles.length === curValues.length

      return isCurAllvalid && JSON.stringify(curValues) !== JSON.stringify(initValues)
    },
    get touched(): TTouched {
      const slf = self as TStore

      const {
        initSettings: init,
        _tagsIndexTouched,
        _socialLinksTouched,
        _mediaReportsTouched,
        editingLink,
      } = slf

      const _isChanged = (field: TSettingField): boolean =>
        !equals(toJS(slf[field]), toJS(init[field]))
      const _anyChanged = (fields: TSettingField[]): boolean => any(_isChanged)(fields)
      const _mapArrayChanged = (key: string): boolean => {
        return JSON.stringify(toJS(self[key])) !== JSON.stringify(toJS(self.initSettings[key]))
      }

      const primaryColorTouched = _isChanged('primaryColor')
      const brandLayoutTouched = _isChanged('brandLayout')
      const avatarTouched = _isChanged('avatarLayout')
      const tagTouched = _isChanged('tagLayout')

      const bannerLayoutTouched = _isChanged('bannerLayout')
      const postLayoutTouched = _isChanged('postLayout')
      const kanbanLayoutTouched = _isChanged('kanbanLayout')
      const kanbanCardLayoutTouched = _isChanged('kanbanCardLayout')
      const kanbanBgColorsTouched = _isChanged('kanbanBgColors')
      const docLayoutTouched = _isChanged('docLayout')
      const docFaqLayoutTouched = _isChanged('docFaqLayout')

      const headerLinksChanged = _isChanged('headerLinks') && editingLink === null
      const footerLinksChanged = _isChanged('footerLinks') && editingLink === null

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
      const gossBlurTouched = _isChanged('gossBlur')
      const gossBlurDarkTouched = _isChanged('gossBlurDark')
      const glowOpacityTouched = _isChanged('glowOpacity')

      const nameAliasTouched = !isNil(slf.editingAlias)
      const tagsTouched = !isNil(slf.editingTag)
      const faqSectionsTouched = _mapArrayChanged('faqSections')

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
        tagLayout: tagTouched,
        avatarLayout: avatarTouched,
        bannerLayout: bannerLayoutTouched,
        topbarLayout: topbarLayoutTouched,
        topbarBg: topbarBgTouched,

        postLayout: postLayoutTouched,
        footerLayout: footerLayoutTouched,
        headerLayout: headerLayoutTouched,
        kanbanLayout: kanbanLayoutTouched,
        kanbanCardLayout: kanbanCardLayoutTouched,
        kanbanBgColors: kanbanBgColorsTouched,
        docLayout: docLayoutTouched,
        docFaqLayout: docFaqLayoutTouched,
        changelogLayout: changelogLayoutTouched,
        nameAlias: nameAliasTouched,
        tags: tagsTouched,
        tagsIndex: _tagsIndexTouched,
        socialLinks: _socialLinksTouched,
        mediaReports: _mediaReportsTouched,

        headerLinks: headerLinksChanged,
        footerLinks: footerLinksChanged,
        faqSections: faqSectionsTouched,

        glowFixed: glowFixedTouched,
        glowType: glowTypeTouched,
        glowOpacity: glowOpacityTouched,

        gossBlur: gossBlurTouched,
        gossBlurDark: gossBlurDarkTouched,
        rssFeed: rssFeedTypeTouched || rssFeedCountTouched,

        widgetsPrimaryColor: widgetsPrimaryColorTouched,
        widgetsThreads: widgetsThreadsTouched,
        widgetsSize: widgetsSizeTouched,

        //
        baseInfo: _anyChanged(BASEINFO_KEYS as TSettingField[]),
        seo: _anyChanged(SEO_KEYS as TSettingField[]),
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
        const aliasItem = find(propEq(pThread.slug, 'slug'))(nameAlias) as TNameAlias

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

    get broadcastSettings(): TBroadcastSettings {
      const slf = self as TStore

      return {
        ...pick(BROADCAST_KEYS, slf),
        saving: slf.saving,
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

    _assignChecked(entries: TArticleEntries): TArticleEntries {
      const slf = self as TStore
      const { batchSelectedIDs } = slf
      const _batchSelectedIds = toJS(batchSelectedIDs)

      return entries.map((article) => ({
        ...article,
        _checked: includes(article.id, _batchSelectedIds),
      }))
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
