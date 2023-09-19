import { FC, Fragment, useEffect } from 'react'
import { observer } from 'mobx-react'
// import useMobileDetect from '@groupher/use-mobile-detect-hook'
import { Toaster } from 'sonner'

import useShortcut from '@/hooks/useShortcut'
import useMetric from '@/hooks/useMetric'

import Drawer from '@/containers/tool/Drawer'
import Subscriber from '@/containers/tool/Subscriber'
import AuthWall from '@/containers/tool/AuthWall'
import ErrorBox from '@/containers/tool/ErrorBox'

import { logBuddha } from './logic'
// import { Drawer } from './dynamic'

const Addon: FC = () => {
  // const { isMobile } = useMobileDetect()

  useEffect(() => logBuddha(), [])
  useShortcut('Control+P', () => console.log('# Ctrl P pressed'))
  const metric = useMetric()

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

export default observer(Addon)
