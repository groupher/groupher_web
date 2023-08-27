import { useEffect } from 'react'
import { includes, values, uniq, reject, update, findIndex } from 'ramda'

import type { TEditValue, TFAQSection, TID, TSocialItem, TUser } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'
import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import { buildLog } from '@/utils/logger'
import { updateEditing, toJS } from '@/utils/mobx'
import { errRescue } from '@/utils/signal'
import asyncSuit from '@/utils/async'

import type { TStore } from '../store'
import type { TSettingField, TNameAlias } from '../spec'

import { SETTING_FIELD, SETTING_LAYOUT_FIELD, BASEINFO_KEYS, SEO_KEYS } from '../constant'
import { init as linksLogicInit } from './links'
import { init as tagsLogicInit } from './tags'
import { init as faqInit } from './faq'

import S from '../schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.DRAWER.AFTER_CLOSE, EVENT.REFRESH_TAGS],
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:DashboardThread')

export const enableThread = (key: string, toggle: boolean) => {
  const { enableSettings, curCommunity } = store

  const enable = {
    ...enableSettings,
    [key]: toggle,
  }

  store.mark({ enable })
  store.onSave('enable')

  sr71$.mutate(S.updateDashboardEnable, { community: curCommunity.slug, [key]: toggle })
}

export const updateEditingAlias = (alias: TNameAlias): void => store.mark({ editingAlias: alias })

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

  if (field === SETTING_FIELD.BASE_INFO) {
    const params = {}
    BASEINFO_KEYS.forEach((key) => {
      params[key] = store[key]
    })

    sr71$.mutate(S.updateDashboardBaseInfo, { community, ...params })
    return
  }

  if (field === SETTING_FIELD.SEO) {
    const params = {}
    SEO_KEYS.forEach((key) => {
      params[key] = store[key]
    })

    sr71$.mutate(S.updateDashboardSeo, { community, ...params })
    return
  }

  if (includes(field, values(SETTING_LAYOUT_FIELD))) {
    sr71$.mutate(S.updateDashboardLayout, { community, [field]: e })
  }

  if (field === SETTING_FIELD.NAME_ALIAS) {
    const nameAlias = toJS(store.nameAlias)
    sr71$.mutate(S.updateDashboardNameAlias, { community, nameAlias })
  }

  if (field === SETTING_FIELD.TAG) {
    store.updateEditingTag()
    sr71$.mutate(S.updateArticleTag, { ...toJS(store.editingTag), community })
  }

  if (field === SETTING_FIELD.FAQ_SECTIONS) {
    sr71$.mutate(S.updateDashboardFaqs, { faqs: toJS(store.faqSections), community })
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
  }

  if (field === SETTING_FIELD.FAQ_SECTION_ADD) {
    const { faqSections, editingFAQ } = store
    const _faqSections = [...toJS(faqSections), toJS(editingFAQ)]

    store.mark({ faqSections: _faqSections, editingFAQ: null, editingFAQIndex: null })
    sr71$.mutate(S.updateDashboardFaqs, { faqs: _faqSections, community })
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

  if (field === SETTING_FIELD.SOCIAL_LINKS) {
    const { socialLinks } = store.baseInfoSettings
    sr71$.mutate(S.updateDashboardSocialLinks, { community, socialLinks })
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

// reload after create/delete tag and swtich between tag threads
export const reloadArticleTags = (): void => {
  const { curCommunity, activeTagThread } = store
  const filter = { community: curCommunity.slug, thread: activeTagThread.toUpperCase() }
  //
  sr71$.query(S.pagedArticleTags, { filter })
}

/**
 * save to server
 */
export const onSave = (field: TSettingField): void => {
  store.mark({ saving: true, savingField: field })
  store.onSave(field)

  console.log('## on save: ', field)

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

export const loadChangelogs = () => {
  const { curCommunity } = store

  store.mark({ loading: true })
  sr71$.query(S.pagedChangelogs, {
    filter: { page: 1, size: 20, community: curCommunity.slug },
    userHasLogin: false,
  })
}

/**
 * batch select any TID list
 */
export const batchSelect = (id: TID, selected = true): void => {
  const {
    cmsContents: { batchSelectedIDs },
  } = store

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

// ###############################
// init & uninit handlers
// ###############################
const _handleDone = () => {
  const field = store.savingField

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

    BASEINFO_KEYS.forEach((key) => {
      current[key] = store[key]
    })

    initSettings = { ...store.initSettings, ...current }
  } else if (field === SETTING_FIELD.SEO) {
    const current = {}

    SEO_KEYS.forEach((key) => {
      current[key] = store[key]
    })

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
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardSeo'),
    action: () => _handleDone(),
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
    match: asyncRes('pagedPosts'),
    action: ({ pagedPosts }) => {
      store.mark({ pagedPosts, loading: false })
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
    match: asyncRes(EVENT.REFRESH_TAGS),
    action: () => {
      reloadArticleTags()
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
    log('useInit: ', store)

    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
