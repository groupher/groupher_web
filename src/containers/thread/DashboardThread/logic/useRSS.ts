import { useCallback } from 'react'
import { pick } from 'ramda'

import type { TEditFunc } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

import useHelper from './useHelper'

type TRet = {
  rssFeedType: string
  rssFeedCount: number
  saving: boolean
  getIsTouched: () => boolean
  edit: TEditFunc
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const { edit, isChanged } = useHelper()

  const getIsTouched = useCallback(
    () => isChanged('rssFeedType') || isChanged('rssFeedCount'),
    [store],
  )

  return {
    edit,
    ...pick(['rssFeedType', 'rssFeedCount', 'saving'], store),
    getIsTouched,
  }
}
