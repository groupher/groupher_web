import { FC, Fragment, memo, useEffect } from 'react'
// import useMobileDetect from '@groupher/use-mobile-detect-hook'

import useShortcut from '@/hooks/useShortcut'

import Drawer from '@/containers/tool/Drawer'
import Subscriber from '@/containers/tool/Subscriber'
import AuthWall from '@/containers/tool/AuthWall'

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
      <Subscriber />
      <AuthWall />
      {/* @ts-ignore */}
      {/* @ts-ignore */}
      {/* @ts-ignore */}
      {/* <ErrorBox /> */}
    </Fragment>
  )
}

export default memo(Addon)
