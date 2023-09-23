import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TSocialItem, TMediaReport } from '@/spec'

type TABoutInfo = {
  homepage: string | null
  cities: string[]
  techstacks: string[]
  socialLinks: TSocialItem[]
  mediaReports: TMediaReport[]
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAboutInfo = (): TABoutInfo => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  const { homepage, city, techstack, socialLinks, mediaReports } = store.dashboardThread

  return {
    homepage,
    cities: city.split(','),
    techstacks: techstack.split(','),
    socialLinks,
    mediaReports,
  }
}

export default useAboutInfo
