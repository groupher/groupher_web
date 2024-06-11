import { isEmpty, reject, equals } from 'ramda'

import type { TSocialItem } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

export type TRet = {
  socialLinks: TSocialItem[]
  isSocialLinksTouched: boolean
}

const useSocialLinks = (): TRet => {
  const store = useSubStore('dashboard')

  const { socialLinks, initSettings } = store

  const socialLinksTouched = () => {
    return !equals(socialLinks, initSettings.socialLinks)
  }

  return {
    socialLinks: reject((item: TSocialItem) => isEmpty(item.type), socialLinks),
    isSocialLinksTouched: socialLinksTouched(),
  }
}

export default useSocialLinks
