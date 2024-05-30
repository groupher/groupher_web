import { useEffect } from 'react'
import {
  includes,
  values,
  uniq,
  reject,
  omit,
  update,
  findIndex,
  mergeRight,
  find,
  startsWith,
  forEach,
} from 'ramda'

import type { TEditValue, TFAQSection, TID, TSocialItem, TUser, TMediaReport } from '@/spec'
import { COLOR_NAME } from '@/const/colors'
import EVENT from '@/const/event'
import ERR from '@/const/err'

import { DASHBOARD_ROUTE, DASHBOARD_BASEINFO_ROUTE, DASHBOARD_SEO_ROUTE } from '@/const/route'

import { updateEditing, toJS } from '@/mobx'
import asyncSuit from '@/async'
import { toast, errRescue } from '@/signal'

import type { TStore } from '../store'
import type { TSettingField, TNameAlias } from '../spec'

import {
  SETTING_FIELD,
  SETTING_LAYOUT_FIELD,
  BASEINFO_KEYS,
  SEO_KEYS,
  SEO_OG_KEYS,
  SEO_TW_KEYS,
  EMPTY_MEDIA_REPORT,
  BASEINFO_BASIC_KEYS,
  BASEINFO_OTHER_KEYS,
} from '../constant'
import { init as linksLogicInit } from './links'
import { init as tagsLogicInit } from './tags'
import { init as faqInit } from './faq'

import S from '../schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.DRAWER.AFTER_CLOSE, EVENT.REFRESH_TAGS, EVENT.REFRESH_MODERATORS],
})

let store: TStore | undefined
let sub$ = null

export const enableThread = (key: string, toggle: boolean): void => {
  const { enableSettings, curCommunity } = store

  const enable = {
    ...enableSettings,
    [key]: toggle,
  }

  store.mark({ enable })
  store.onSave('enable')

  sr71$.mutate(S.updateDashboardEnable, { community: curCommunity.slug, [key]: toggle })
}

export const toggleSEO = (seoEnable: boolean): void => {
  const { curCommunity } = store

  sr71$.mutate(S.updateDashboardSeo, { community: curCommunity.slug, seoEnable })
}

export const addDocCategory = (): void => {
  const docCategories = store.docSettings.categories.concat({
    name: '新分类',
    index: store.docCategories.length,
    color: COLOR_NAME.BLACK,
    files: [],
  })

  store.mark({ docCategories })
}

export const rssOnSave = (): void => {
  store.mark({ saving: true })
  const { RSS_FEED_TYPE, RSS_FEED_COUNT } = SETTING_FIELD

  store.onSave(RSS_FEED_TYPE)
  store.onSave(RSS_FEED_COUNT)

  setTimeout(() => {
    store.mark({ saving: false })

    const initSettings = {
      ...store.initSettings,
      [RSS_FEED_TYPE]: toJS(store[RSS_FEED_TYPE]),
      [RSS_FEED_COUNT]: toJS(store[RSS_FEED_COUNT]),
    }

    store.mark({ initSettings })
  }, 1200)
}

export const rssOnCancel = (): void => {
  const { RSS_FEED_TYPE, RSS_FEED_COUNT } = SETTING_FIELD

  store.rollbackEdit(RSS_FEED_TYPE)
  store.rollbackEdit(RSS_FEED_COUNT)
}

export const broadcastOnSave = (isArticle = false): void => {
  store.mark({ saving: true })
  const layoutKey = !isArticle
    ? SETTING_FIELD.BROADCAST_LAYOUT
    : SETTING_FIELD.BROADCAST_ARTICLE_LAYOUT
  const bgKey = !isArticle ? SETTING_FIELD.BROADCAST_BG : SETTING_FIELD.BROADCAST_ARTICLE_BG

  store.onSave(layoutKey)
  store.onSave(bgKey)

  setTimeout(() => {
    store.mark({ saving: false })

    const initSettings = {
      ...store.initSettings,
      [layoutKey]: toJS(store[layoutKey]),
      [bgKey]: toJS(store[bgKey]),
    }
    store.mark({ initSettings })
  }, 1200)
}

export const broadcastOnCancel = (isArticle = false): void => {
  const layoutKey = !isArticle
    ? SETTING_FIELD.BROADCAST_LAYOUT
    : SETTING_FIELD.BROADCAST_ARTICLE_LAYOUT
  const bgKey = !isArticle ? SETTING_FIELD.BROADCAST_BG : SETTING_FIELD.BROADCAST_ARTICLE_BG

  store.rollbackEdit(layoutKey)
  store.rollbackEdit(bgKey)
}

export const deleteFAQSection = (index: number): void => {
  const { curCommunity, faqSections } = store
  const community = curCommunity.slug

  store.mark({
    faqSections: reject((faq: TFAQSection) => faq.index === index, toJS(faqSections)),
    savingField: SETTING_FIELD.FAQ_SECTION_DELETE,
  })
  sr71$.mutate(S.updateDashboardFaqs, { faqs: toJS(store.faqSections), community })
}

const _doMutation = (field: string, e: TEditValue): void => {
  const { curCommunity } = store
  const community = curCommunity.slug

  if (field === SETTING_FIELD.MEDIA_REPORTS) {
    const { baseInfoSettings } = store
    const { mediaReports } = baseInfoSettings

    sr71$.mutate(S.updateDashboardMediaReports, {
      community,
      mediaReports: mediaReports.map((item) => omit(['editUrl'], item)),
    })
    return
  }

  if (field === SETTING_FIELD.HEADER_LINKS) {
    const { headerSettings } = store
    const { headerLinks } = headerSettings

    sr71$.mutate(S.updateDashboardHeaderLinks, { community, headerLinks })
    return
  }

  if (field === SETTING_FIELD.FOOTER_LINKS) {
    const { footerSettings } = store
    const { footerLinks } = footerSettings

    sr71$.mutate(S.updateDashboardFooterLinks, { community, footerLinks })
    return
  }

  if (field === SETTING_FIELD.BASE_INFO) {
    const { baseInfoTab } = store

    const params = {}
    if (baseInfoTab === DASHBOARD_BASEINFO_ROUTE.BASIC) {
      forEach((key) => {
        params[key] = store[key]
      }, BASEINFO_BASIC_KEYS)
    }

    if (baseInfoTab === DASHBOARD_BASEINFO_ROUTE.OTHER) {
      forEach((key) => {
        params[key] = store[key]
      }, BASEINFO_OTHER_KEYS)
    }

    sr71$.mutate(S.updateDashboardBaseInfo, { community, ...params })
    return
  }

  if (field === SETTING_FIELD.SOCIAL_LINKS) {
    const { socialLinks } = store.baseInfoSettings
    sr71$.mutate(S.updateDashboardSocialLinks, { community, socialLinks })
    return
  }

  if (field === SETTING_FIELD.SEO) {
    const params = {}
    const { seoTab } = store

    if (seoTab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE) {
      forEach((key) => {
        params[key] = store[key]
      }, SEO_OG_KEYS)
    }

    if (seoTab === DASHBOARD_SEO_ROUTE.TWITTER) {
      forEach((key) => {
        params[key] = store[key]
      }, SEO_TW_KEYS)
    }

    sr71$.mutate(S.updateDashboardSeo, { community, ...params })
    return
  }

  if (includes(field, values(SETTING_LAYOUT_FIELD))) {
    sr71$.mutate(S.updateDashboardLayout, { community, [field]: e })
    return
  }

  if (field === SETTING_FIELD.NAME_ALIAS) {
    const nameAlias = toJS(store.nameAlias)
    sr71$.mutate(S.updateDashboardNameAlias, { community, nameAlias })
    return
  }

  if (field === SETTING_FIELD.TAG) {
    console.log("## if it's here: ", field)
    store.updateEditingTag()
    sr71$.mutate(S.updateArticleTag, { ...toJS(store.editingTag), community })
    return
  }

  if (field === SETTING_FIELD.FAQ_SECTIONS) {
    sr71$.mutate(S.updateDashboardFaqs, { faqs: toJS(store.faqSections), community })
    return
  }

  if (field === SETTING_FIELD.FAQ_SECTION_ITEM) {
    const { editingFAQ, faqSections } = store
    const _editingFAQ = toJS(editingFAQ)
    const _faqSections = toJS(faqSections)
    const targetIndex = findIndex(
      (item: TFAQSection) => item.index === editingFAQ.index,
      _faqSections,
    )

    const updatedSections = update(targetIndex, _editingFAQ, _faqSections)
    store.mark({ faqSections: updatedSections, editingFAQ: null, editingFAQIndex: null })
    sr71$.mutate(S.updateDashboardFaqs, { faqs: updatedSections, community })
    return
  }

  if (field === SETTING_FIELD.FAQ_SECTION_ADD) {
    const { faqSections, editingFAQ } = store
    const _faqSections = [...toJS(faqSections), toJS(editingFAQ)]

    store.mark({ faqSections: _faqSections, editingFAQ: null, editingFAQIndex: null })
    sr71$.mutate(S.updateDashboardFaqs, { faqs: _faqSections, community })
    return
  }

  if (field === SETTING_FIELD.TAG_INDEX) {
    const { activeTagThread, activeTagGroup: group, tags } = store
    const thread = activeTagThread.toUpperCase()

    const tagIndex = toJS(tags).map((item) => ({
      id: item.id,
      index: item.index,
    }))

    sr71$.mutate(S.reindexTagsInGroup, { community, thread, group, tags: tagIndex })
  }
}

export const updateSocialLinks = (socialLinks: TSocialItem[]): void => {
  store.mark({ socialLinks })
}

/**
 * rollback editing value to init value
 */
export const rollbackEdit = (field: TSettingField): void => store.rollbackEdit(field)
export const resetEdit = (field: TSettingField): void => store.resetEdit(field)
export const edit = (e: TEditValue, field: string): void => updateEditing(store, field, e)

export const reloadModerators = (): void => {
  const { curCommunity } = store

  sr71$.query(S.updateModerators, { slug: curCommunity.slug, incViews: false })
}

/**
 * save to server
 */
export const onSave = (field: TSettingField): void => {
  store.mark({ saving: true, savingField: field })
  store.onSave(field)

  console.log('## ## on save: ', field)

  _doMutation(field, store[field])
}

export const loadPosts = () => {
  const { curCommunity } = store
  store.mark({ loading: true })
  sr71$.query(S.pagedPosts, {
    filter: { page: 1, size: 20, community: curCommunity.slug },
    userHasLogin: false,
  })
}

export const loadChangelogs = (): void => {
  const { curCommunity } = store

  store.mark({ loading: true })
  sr71$.query(S.pagedChangelogs, {
    filter: { page: 1, size: 20, community: curCommunity.slug },
    userHasLogin: false,
  })
}

export const loadSocialLinks = (): void => {
  const { curCommunity } = store

  sr71$.query(S.communitySocialLinks, {
    slug: curCommunity.slug,
    incViews: false,
  })
}

/**
 * batch select any TID list
 */
export const batchSelect = (id: TID, selected = true): void => {
  const { batchSelectedIDs } = store

  const _batchSelectedIds = selected
    ? [...batchSelectedIDs, id]
    : reject((_id) => id === _id, batchSelectedIDs)

  store.mark({ batchSelectedIDs: uniq(_batchSelectedIds) })
}

export const batchSelectAll = (selected: boolean, ids = []): void => {
  if (!selected) {
    store.mark({ batchSelectedIDs: [] })
    return
  }

  store.mark({ batchSelectedIDs: ids })
}

// set current setting moderator in admins page
export const setActiveSettingAdmin = (user: TUser): void => {
  store.mark({ activeModerator: user })
}

export const queryOpenGraphInfo = (item: TMediaReport): void => {
  const { url, editUrl } = item

  if ((startsWith('https://', editUrl) || startsWith('http://', editUrl)) && url !== editUrl) {
    store.mark({ queringMediaReportIndex: item.index, loading: true })
    sr71$.query(S.openGraphInfo, { url: editUrl })
  }
}

// ###############################
// init & uninit handlers
// ###############################
const _handleDone = () => {
  const field = store.savingField
  toast('设置已保存')

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let initSettings

  if (field === SETTING_FIELD.TAG_INDEX) {
    initSettings = { ...store.initSettings, tags: toJS(store.tags) }
  } else if (includes(field, [SETTING_FIELD.FAQ_SECTION_ADD, SETTING_FIELD.FAQ_SECTION_DELETE])) {
    initSettings = { ...store.initSettings, faqSections: toJS(store.faqSections) }
  } else if (field === SETTING_FIELD.TAG) {
    store.updateEditingTag()
    initSettings = { ...store.initSettings }
  } else if (field === SETTING_FIELD.BASE_INFO) {
    const current = {}

    forEach((key) => {
      current[key] = store[key]
    }, BASEINFO_KEYS)

    initSettings = { ...store.initSettings, ...current }
  } else if (field === SETTING_FIELD.SEO) {
    const current = {}

    forEach((key) => {
      current[key] = store[key]
    }, SEO_KEYS)

    initSettings = { ...store.initSettings, ...current }
  } else {
    initSettings = { ...store.initSettings, [field]: toJS(store[field]) }
  }

  store.mark({ initSettings })

  // manually update in here not in store is because if this action fails,
  // store will rollback to previous value
  if (field === SETTING_FIELD.TAG) store.mark({ editingTag: null })
  if (field === SETTING_FIELD.NAME_ALIAS) store.mark({ editingAlias: null })

  // avoid page component jump caused by saving state
  setTimeout(() => {
    store.mark({ saving: false, savingField: null })
  }, 800)
}

const _handleError = () => {
  const field = store.savingField
  store.mark({ saving: false, savingField: null })
  store.rollbackEdit(field as TSettingField)
}

const DataSolver = [
  {
    match: asyncRes('updateDashboardBaseInfo'),
    action: ({ updateDashboardBaseInfo }) => {
      store.updateViewingCommunity({ ...updateDashboardBaseInfo })
      _handleDone()
    },
  },
  {
    match: asyncRes('updateDashboardMediaReports'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardSeo'),
    action: ({ updateDashboardSeo }) => {
      const {
        dashboard: {
          seo: { seoEnable },
        },
      } = updateDashboardSeo
      const { initSettings } = store
      store.mark({ seoEnable, initSettings: { ...toJS(initSettings), seoEnable } })

      _handleDone()
    },
  },
  {
    match: asyncRes('updateDashboardEnable'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardLayout'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardNameAlias'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateArticleTag'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardFaqs'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardSocialLinks'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('reindexTagsInGroup'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardHeaderLinks'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardFooterLinks'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('pagedPosts'),
    action: ({ pagedPosts }) => {
      store.mark({ pagedPosts, loading: false })
    },
  },
  {
    match: asyncRes('openGraphInfo'),
    action: ({ openGraphInfo }) => {
      const { queringMediaReportIndex, baseInfoSettings } = store
      const { mediaReports } = baseInfoSettings

      const restReports = reject(
        (item: TMediaReport) => item.index === queringMediaReportIndex,
        mediaReports,
      )
      const report = find(
        (item: TMediaReport) => item.index === queringMediaReportIndex,
        mediaReports,
      )
      const updatedReport = mergeRight(report, openGraphInfo)

      store.mark({
        mediaReports: [...restReports, updatedReport],
        queringMediaReportIndex: null,
        loading: false,
      })
    },
  },
  {
    match: asyncRes('pagedArticleTags'),
    action: ({ pagedArticleTags }) => {
      const { initSettings } = store
      const tags = pagedArticleTags.entries

      store.mark({ tags, initSettings: { ...initSettings, tags } })
    },
  },
  {
    match: asyncRes('community'),
    action: ({ community }) => {
      const { curTab, baseInfoTab } = store

      if (curTab === DASHBOARD_ROUTE.ADMINS) store.mark({ moderators: community.moderators })
      if (curTab === DASHBOARD_ROUTE.DASHBOARD && baseInfoTab === DASHBOARD_BASEINFO_ROUTE.BASIC) {
        store.updateOverview(community)
      }
    },
  },
  {
    match: asyncRes(EVENT.REFRESH_MODERATORS),
    action: () => reloadModerators(),
  },
  {
    match: asyncRes(EVENT.REFRESH_TAGS),
    action: () => {
      // reloadArticleTags()
      store.mark({ settingTag: null })
    },
  },
  {
    match: asyncRes(EVENT.DRAWER.AFTER_CLOSE),
    action: () => {
      store.mark({ settingTag: null, activeModerator: null })
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      _handleError()
      errRescue({ type: ERR.GRAPHQL, details, path: 'DashboardThread' })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      _handleError()
      errRescue({ type: ERR.TIMEOUT, details, path: 'DashboardThread' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      _handleError()
      errRescue({ type: ERR.NETWORK, path: 'DashboardThread' })
    },
  },
]

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    linksLogicInit(store)
    tagsLogicInit(store)
    faqInit(store)

    console.log('## useInit: ', store)

    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
