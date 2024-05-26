import { useEffect } from 'react'
import { includes } from 'ramda'

import type { TCommunity, TEditValue } from '@/spec'
import { DASHBOARD_BASEINFO_ROUTE } from '@/const/route'
import { runInAction, toJS } from '@/mobx'

import useDashboard from '@/hooks/useDashboard'
import useQuery from '@/hooks/useQuery'

import { mutate } from '@/utils/api'
import { toast } from '@/signal'

import {
  SETTING_FIELD,
  BASEINFO_BASIC_KEYS,
  BASEINFO_OTHER_KEYS,
  BASEINFO_KEYS,
  SEO_KEYS,
} from '../constant'
import S from '../schema'

type TRet = {
  mutation: (field: string, e: TEditValue) => Promise<void>
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useMutation = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { curCommunity } = store
  const community = curCommunity.slug

  const _handleDone = () => {
    toast('设置已保存')
    const field = store.savingField

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let initSettings

    if (field === SETTING_FIELD.TAG_INDEX) {
      initSettings = { ...store.initSettings, tags: toJS(store.tags) }
    } else if (includes(field, [SETTING_FIELD.FAQ_SECTION_ADD, SETTING_FIELD.FAQ_SECTION_DELETE])) {
      initSettings = { ...store.initSettings, faqSections: toJS(store.faqSections) }
    } else if (field === SETTING_FIELD.TAG) {
      // _updateEditingTag()
      initSettings = { ...store.initSettings }
    } else if (field === SETTING_FIELD.BASE_INFO) {
      const current = {}

      for (const key of BASEINFO_KEYS) {
        current[key] = store[key]
      }
      initSettings = { ...store.initSettings, ...current }
    } else if (field === SETTING_FIELD.SEO) {
      const current = {}

      for (const key of SEO_KEYS) {
        current[key] = store[key]
      }
      initSettings = { ...store.initSettings, ...current }
    } else {
      initSettings = { ...store.initSettings, [field]: toJS(store[field]) }
    }

    store.initSettings = initSettings

    // manually update in here not in store is because if this action fails,
    // store will rollback to previous value
    if (field === SETTING_FIELD.TAG) store.editingTag = null
    if (field === SETTING_FIELD.NAME_ALIAS) store.editingAlias = null

    // avoid page component jump caused by saving state
    setTimeout(() => {
      runInAction(() => {
        store.saving = false
        store.savingField = null
      })
    }, 800)
  }

  const mutation = (field: string, e: TEditValue): Promise<void> => {
    // const community = curCommunity.slug

    // if (field === SETTING_FIELD.MEDIA_REPORTS) {
    //   const { baseInfoSettings } = store
    //   const { mediaReports } = baseInfoSettings

    //   sr71$.mutate(S.updateDashboardMediaReports, {
    //     community,
    //     mediaReports: mediaReports.map((item) => omit(['editUrl'], item)),
    //   })
    //   return
    // }

    // if (field === SETTING_FIELD.HEADER_LINKS) {
    //   const { headerSettings } = store
    //   const { headerLinks } = headerSettings

    //   sr71$.mutate(S.updateDashboardHeaderLinks, { community, headerLinks })
    //   return
    // }

    // if (field === SETTING_FIELD.FOOTER_LINKS) {
    //   const { footerSettings } = store
    //   const { footerLinks } = footerSettings

    //   sr71$.mutate(S.updateDashboardFooterLinks, { community, footerLinks })
    //   return
    // }

    if (field === SETTING_FIELD.BASE_INFO) {
      const { baseInfoTab } = store

      const params = {}
      if (baseInfoTab === DASHBOARD_BASEINFO_ROUTE.BASIC) {
        for (const key of BASEINFO_BASIC_KEYS) {
          params[key] = store[key]
        }
      }

      if (baseInfoTab === DASHBOARD_BASEINFO_ROUTE.OTHER) {
        for (const key of BASEINFO_OTHER_KEYS) {
          params[key] = store[key]
        }
      }

      mutate(S.updateDashboardBaseInfo, { community, ...params }).then((data) => {
        store.updateViewingCommunity(data.updateDashboardBaseInfo)
        _handleDone()
      })

      return
    }

    // if (field === SETTING_FIELD.SOCIAL_LINKS) {
    //   const { socialLinks } = store.baseInfoSettings
    //   sr71$.mutate(S.updateDashboardSocialLinks, { community, socialLinks })
    //   return
    // }

    // if (field === SETTING_FIELD.SEO) {
    //   const params = {}
    //   const { seoTab } = store

    //   if (seoTab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE) {
    //     forEach((key) => {
    //       params[key] = store[key]
    //     }, SEO_OG_KEYS)
    //   }

    //   if (seoTab === DASHBOARD_SEO_ROUTE.TWITTER) {
    //     forEach((key) => {
    //       params[key] = store[key]
    //     }, SEO_TW_KEYS)
    //   }

    //   sr71$.mutate(S.updateDashboardSeo, { community, ...params })
    //   return
    // }

    // if (includes(field, values(SETTING_LAYOUT_FIELD))) {
    //   sr71$.mutate(S.updateDashboardLayout, { community, [field]: e })
    //   return
    // }

    // if (field === SETTING_FIELD.NAME_ALIAS) {
    //   const nameAlias = toJS(store.nameAlias)
    //   sr71$.mutate(S.updateDashboardNameAlias, { community, nameAlias })
    //   return
    // }

    // if (field === SETTING_FIELD.TAG) {
    //   console.log("## if it's here: ", field)
    //   store.updateEditingTag()
    //   sr71$.mutate(S.updateArticleTag, { ...toJS(store.editingTag), community })
    //   return
    // }

    // if (field === SETTING_FIELD.FAQ_SECTIONS) {
    //   sr71$.mutate(S.updateDashboardFaqs, { faqs: toJS(store.faqSections), community })
    //   return
    // }

    // if (field === SETTING_FIELD.FAQ_SECTION_ITEM) {
    //   const { editingFAQ, faqSections } = store
    //   const _editingFAQ = toJS(editingFAQ)
    //   const _faqSections = toJS(faqSections)
    //   const targetIndex = findIndex(
    //     (item: TFAQSection) => item.index === editingFAQ.index,
    //     _faqSections,
    //   )

    //   const updatedSections = update(targetIndex, _editingFAQ, _faqSections)
    //   store.mark({ faqSections: updatedSections, editingFAQ: null, editingFAQIndex: null })
    //   sr71$.mutate(S.updateDashboardFaqs, { faqs: updatedSections, community })
    //   return
    // }

    // if (field === SETTING_FIELD.FAQ_SECTION_ADD) {
    //   const { faqSections, editingFAQ } = store
    //   const _faqSections = [...toJS(faqSections), toJS(editingFAQ)]

    //   store.mark({ faqSections: _faqSections, editingFAQ: null, editingFAQIndex: null })
    //   sr71$.mutate(S.updateDashboardFaqs, { faqs: _faqSections, community })
    //   return
    // }

    // if (field === SETTING_FIELD.TAG_INDEX) {
    //   const { activeTagThread, activeTagGroup: group, tags } = store
    //   const thread = activeTagThread.toUpperCase()

    //   const tagIndex = toJS(tags).map((item) => ({
    //     id: item.id,
    //     index: item.index,
    //   }))

    //   sr71$.mutate(S.reindexTagsInGroup, { community, thread, group, tags: tagIndex })
    // }
  }

  // useEffect(() => {
  //   if (data?.community) updateOverview(data.community)
  // }, [data])

  return { mutation }
}

export default useMutation
