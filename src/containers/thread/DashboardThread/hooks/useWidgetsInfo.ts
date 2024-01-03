import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TColorName, TWidgetType, TThread, TSizeSML } from '@/spec'

type TRet = {
  saving: boolean
  widgetsPrimaryColor: TColorName
  widgetsThreads: TThread[]
  widgetsSize: TSizeSML
  widgetsType: TWidgetType
  isThreadTouched: boolean
  isPrimaryColorTouched: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useWidgetsInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { widgetsPrimaryColor, widgetsThreads, widgetsSize, widgetsType, saving, touched } =
    store.dashboardThread

  return {
    widgetsPrimaryColor,
    widgetsThreads,
    widgetsSize,
    widgetsType,
    saving,
    isThreadTouched: touched.widgetsThreads,
    isPrimaryColorTouched: touched.widgetsPrimaryColor,
  }
}

export default useWidgetsInfo
