import type { TEnableConfig } from '@/spec'

import useSubState from '@/hooks/useSubStore'
// import useViewing from '@/hooks/useViewing'

type TRet = {
  enable: TEnableConfig
  enableThread: (key: string, toggle: boolean) => void
}

export default (): TRet => {
  const store = useSubState('dashboard')

  //const { community } = useViewing()
  //  const { edit, resetEdit } = useHelper()

  const { enable } = store

  const enableThread = (key: string, toggle: boolean): void => {
    console.log('## enableThread')
    // const { enableSettings, curCommunity } = store
    // const enable = {
    //   ...enableSettings,
    //   [key]: toggle,
    // }
    // store.mark({ enable })
    // store.onSave('enable')
    // sr71$.mutate(S.updateDashboardEnable, { community: curCommunity.slug, [key]: toggle })
  }

  return {
    enable,
    enableThread,
  }
}
