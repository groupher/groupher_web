import type { TTopbarLayout, TColorName } from '~/spec'

import useSubStore from '~/hooks/useSubStore'

type TRet = {
  topbar: TTopbarLayout
  topbarBg: TColorName
}

export default (): TRet => {
  const store = useSubStore('dashboard')

  return {
    topbar: store.topbarLayout,
    topbarBg: store.topbarBg,
  }
}
