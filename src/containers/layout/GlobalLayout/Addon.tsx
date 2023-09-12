import { FC, Fragment, memo, useEffect } from 'react'
// import useMobileDetect from '@groupher/use-mobile-detect-hook'
import { Toaster } from 'sonner'

import type { TMetric } from '@/spec'
import useShortcut from '@/hooks/useShortcut'

import Drawer from '@/containers/tool/Drawer'
import Subscriber from '@/containers/tool/Subscriber'
import AuthWall from '@/containers/tool/AuthWall'
import ErrorBox from '@/containers/tool/ErrorBox'

import { logBuddha } from './logic'
// import { Drawer } from './dynamic'

type TProps = {
  metric: TMetric
}

const Addon: FC<TProps> = ({ metric }) => {
  // const { isMobile } = useMobileDetect()

  useEffect(() => logBuddha(), [])
  useShortcut('Control+P', () => console.log('# Ctrl P pressed'))

  return (
    <Fragment>
      {/* @ts-ignore */}
      {/* {!isMobile && <AbuseReport />} */}
      {/* @ts-ignore */}
      <Drawer metric={metric} />
      <Subscriber />
      <AuthWall />
      <Toaster position="top-center" closeButton />
      {/* @ts-ignore */}
      <ErrorBox />
    </Fragment>
  )
}

export default memo(Addon)
