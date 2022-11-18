import { FC, Fragment, memo, useEffect } from 'react'
// import useMobileDetect from '@groupher/use-mobile-detect-hook'

import useShortcut from '@/hooks/useShortcut'

import Drawer from '@/containers/tool/Drawer'

import { logBuddha } from './logic'
// import { Drawer } from './dynamic'

const Addon: FC = () => {
  // const { isMobile } = useMobileDetect()

  useEffect(() => logBuddha(), [])
  useShortcut('Control+P', () => console.log('# Ctrl P pressed'))

  return (
    <Fragment>
      {/* @ts-ignore */}
      {/* {!isMobile && <AbuseReport />} */}
      {/* @ts-ignore */}
      <Drawer />
      {/* @ts-ignore */}
      {/* @ts-ignore */}
      {/* {!isMobile && <Doraemon />} */}
      {/* @ts-ignore */}
      {/* <ErrorBox /> */}
    </Fragment>
  )
}

export default memo(Addon)
