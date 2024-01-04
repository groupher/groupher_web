import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { equals } from 'ramda'

import type { TColorName, TWidgetType, TThread, TSizeSML } from '@/spec'
import { toJS } from '@/mobx'

import useHelper from './useHelper'

type TRet = {
  saving: boolean
  widgetsPrimaryColor: TColorName
  widgetsThreads: TThread[]
  widgetsSize: TSizeSML
  widgetsType: TWidgetType
  isThreadTouched: boolean
  isPrimaryColorTouched: boolean
  isSizeTouched: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useWidgetsInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { widgetsPrimaryColor, widgetsThreads, widgetsSize, widgetsType, saving, initSettings } =
    store.dashboardThread

  return {
    widgetsPrimaryColor,
    widgetsThreads,
    widgetsSize,
    widgetsType,
    saving,
    isThreadTouched: !equals(toJS(widgetsThreads).sort(), toJS(initSettings.widgetsThreads).sort()),
    isPrimaryColorTouched: isChanged('widgetsPrimaryColor'),
    isSizeTouched: isChanged('widgetsSize'),
  }
}

export default useWidgetsInfo
