import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TKanbanLayout, TKanbanCardLayout, TColorName } from '@/spec'
import { toJS } from '@/mobx'

type TRet = {
  layout: TKanbanLayout
  cardLayout: TKanbanCardLayout
  isTouched: boolean
  isCardTouched: boolean
  isBgColorsTouched: boolean
  kanbanBgColors: TColorName[]
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useKanbanInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { kanbanLayout, kanbanCardLayout, kanbanBgColors, saving, touched } = store.dashboardThread

  return {
    layout: kanbanLayout,
    cardLayout: kanbanCardLayout,
    isTouched: touched.kanbanLayout,
    isCardTouched: touched.kanbanCardLayout,
    isBgColorsTouched: touched.kanbanBgColors,
    kanbanBgColors: toJS(kanbanBgColors),
    saving,
  }
}

export default useKanbanInfo
