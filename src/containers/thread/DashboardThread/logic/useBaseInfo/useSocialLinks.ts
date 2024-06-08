import { isEmpty, reject, equals } from 'ramda'

import type { TSocialItem } from '@/spec'
import { toJS } from '@/mobx'
import useDashboard from '@/hooks/useDashboard'

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
  }
}

export default useSocialLinks
