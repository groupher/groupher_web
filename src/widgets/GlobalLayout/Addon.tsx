'use client'

import { FC, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
// eslint-disable-next-line import/no-unresolved
import { Toaster } from 'sonner'

import useShortcut from '@/hooks/useShortcut'

import Drawer from '@/containers/tool/Drawer'
import ErrorBox from '@/containers/tool/ErrorBox'
import UserListModal from '@/widgets/UserListModal'

// import { Drawer } from './dynamic'

const Addon: FC = () => {
  // const { isMobile } = useMobileDetect()

  useShortcut('Control+P', () => console.log('# Ctrl P pressed'))

  return (
    <Fragment>
      {/* @ts-ignore */}
      {/* {!isMobile && <AbuseReport />} */}
      {/* @ts-ignore */}
      <Drawer />
      <UserListModal />
      <Toaster position="top-center" closeButton />
      {/* @ts-ignore */}
      <ErrorBox />
    </Fragment>
  )
}

export default observer(Addon)
