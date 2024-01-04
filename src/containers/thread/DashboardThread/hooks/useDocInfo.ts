import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TDocLayout, TDocFAQLayout } from '@/spec'

import useHelper from './useHelper'

type TRet = {
  layout: TDocLayout
  faqLayout: TDocFAQLayout
  isTouched: boolean
  isFaqTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useDocInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { docLayout, docFaqLayout, saving } = store.dashboardThread

  return {
    layout: docLayout,
    faqLayout: docFaqLayout,
    saving,
    isTouched: isChanged('docLayout'),
    isFaqTouched: isChanged('docFaqLayout'),
  }
}

export default useDocInfo
