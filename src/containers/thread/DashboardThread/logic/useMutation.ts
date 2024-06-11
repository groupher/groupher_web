import { useEffect, useRef } from 'react'
import { includes, omit, values } from 'ramda'

import type { TEditValue } from '@/spec'
import { DASHBOARD_BASEINFO_ROUTE } from '@/const/route'
import { toast } from '@/signal'

import { mutate } from '@/utils/api'
import useSubStore from '@/hooks/useSubStore'
import useViewing from '@/hooks/useViewing'

import type { TSettingField } from '@/stores3/dashboard/spec'

import {
  SETTING_FIELD,
  BASEINFO_BASIC_KEYS,
  BASEINFO_OTHER_KEYS,
  SETTING_LAYOUT_FIELD,
  SEO_KEYS,
  BASEINFO_KEYS,
} from '../constant'
import S from '../schema'

type TRet = {
  mutation: (field: string, e: TEditValue) => Promise<void>
}

const useMutation = (): TRet => {
  const store = useSubStore('dashboard')
  const { updateViewingCommunity, community: curCommunity } = useViewing()
  const community = curCommunity.slug
  const storeRef = useRef(store)

  // get latest store, for those state not in UI render cycle
  useEffect(() => {
    storeRef.current = store
  }, [store])

  const _handleDone = () => {
    toast('设置已保存')
    const field = storeRef.current.savingField

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let initSettings

    if (field === SETTING_FIELD.TAG_INDEX) {
      initSettings = { ...store.initSettings, tags: store.tags }
    } else if (includes(field, [SETTING_FIELD.FAQ_SECTION_ADD, SETTING_FIELD.FAQ_SECTION_DELETE])) {
      initSettings = { ...store.initSettings, faqSections: store.faqSections }
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
      initSettings = { ...store.initSettings, [field]: store[field] }
    }

    store.commit({ initSettings })

    // store will rollback to previous value
    if (field === SETTING_FIELD.TAG) store.commit({ editingTag: null })
    if (field === SETTING_FIELD.NAME_ALIAS) store.commit({ editingAlias: null })

    // avoid page component jump caused by saving state
    // store.commit({ saving: false, savingField: null })
    setTimeout(() => {
      store.commit({ saving: false, savingField: null })
    }, 800)
  }

  const mutation = (field: TSettingField, e: TEditValue): Promise<void> => {
    /**
     * store.savingField is not works in this **Promise** staff
     * not Valtio's thing, this is hte wired React staff
     */
    const handleMutation = (schema, params, okCb = null) => {
      mutate(schema, params)
        .then((data) => {
          if (okCb) okCb(data)
          _handleDone()
        })
        .catch((err) => {
          console.error('## handle request error: ', err)
        })
    }

    if (field === SETTING_FIELD.MEDIA_REPORTS) {
      const { mediaReports } = store

      const params = {
        community,
        mediaReports: mediaReports.map((item) => omit(['editUrl'], item)),
      }

      handleMutation(S.updateDashboardMediaReports, params)
      return
    }

    if (field === SETTING_FIELD.HEADER_LINKS) {
      const { headerLinks } = store

      handleMutation(S.updateDashboardHeaderLinks, { community, headerLinks })
      return
    }

    if (field === SETTING_FIELD.FOOTER_LINKS) {
      const { footerLinks } = store
      handleMutation(S.updateDashboardFooterLinks, { community, footerLinks })
      return
    }

    if (field === SETTING_FIELD.BASE_INFO) {
      const { baseInfoTab } = store

      const params = { community }
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

      handleMutation(S.updateDashboardBaseInfo, params, (data) =>
        updateViewingCommunity(data.updateDashboardBaseInfo),
      )
      return
    }

    if (field === SETTING_FIELD.SOCIAL_LINKS) {
      const { socialLinks } = store
      const params = { community, socialLinks }

      handleMutation(S.updateDashboardSocialLinks, params)
      return
    }

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

    if (includes(field, values(SETTING_LAYOUT_FIELD))) {
      handleMutation(S.updateDashboardLayout, { community, [field]: e })
      return
    }
  }

  return { mutation }
}

export default useMutation
