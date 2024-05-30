import { useEffect } from 'react'
import { isEmpty, reject, equals } from 'ramda'

import type { TSocialItem } from '@/spec'
import { toJS } from '@/mobx'
import useDashboard from '@/hooks/useDashboard'
import useHelper from '../useHelper'

export type TRet = {
  socialLinks: TSocialItem[]
  isSocialLinksTouched: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useSocialLinks = (): TRet => {
  const { dashboard: store } = useDashboard()

  const { socialLinks, initSettings } = store

  const socialLinksTouched = () => {
    return !equals(toJS(socialLinks), toJS(initSettings.socialLinks))
  }

  return {
    socialLinks: reject((item: TSocialItem) => isEmpty(item.type), socialLinks),
    isSocialLinksTouched: socialLinksTouched(),
  } as TRet
}

export default useSocialLinks
