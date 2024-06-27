import { useCallback } from 'react'
import { pick } from 'ramda'

import type { TDocLayout, TDocFAQLayout, TEditFunc } from '~/spec'
import useSubStore from '~/hooks/useSubStore'

import useHelper from './useHelper'

type TRet = {
  docLayout: TDocLayout
  docFaqLayout: TDocFAQLayout
  saving: boolean
  getIsTouched: () => boolean
  getIsFaqTouched: () => boolean
  edit: TEditFunc
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const { isChanged, edit } = useHelper()

  // drived
  const getIsTouched = useCallback(() => isChanged('docLayout'), [store])
  const getIsFaqTouched = useCallback(() => isChanged('docFaqLayout'), [store])

  return {
    edit,
    ...pick(['docLayout', 'docFaqLayout', 'saving'], store),
    getIsTouched,
    getIsFaqTouched,
  }
}
