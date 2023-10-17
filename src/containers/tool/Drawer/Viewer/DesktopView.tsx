import { Fragment, FC, ReactNode, memo } from 'react'

import { ANCHOR } from '@/constant/dom'

import type { TSwipeOption } from '../spec'

import { DrawerOverlay, DrawerWrapper, DrawerContent } from '../styles'
import { closeDrawer } from '../logic'

type TProps = {
  testid?: string
  options: TSwipeOption
  visible: boolean
  rightOffset: string
  fromContentEdge: boolean
  type: string
  children: ReactNode
}

const DesktopView: FC<TProps> = ({
  testid = 'drawer-sidebar-panel',
  options,
  visible,
  rightOffset,
  fromContentEdge,
  type,
  children,
}) => {
  return (
    <Fragment>
      <DrawerOverlay
        visible={visible}
        onClick={() => closeDrawer()}
        className={ANCHOR.GLOBAL_BLUR_CLASS}
      />
      <DrawerWrapper
        testid={testid}
        visible={visible}
        fromContentEdge={fromContentEdge}
        rightOffset={rightOffset}
        type={type}
        mobile={false}
        options={options}
      >
        <DrawerContent type={type}>{children}</DrawerContent>
      </DrawerWrapper>
    </Fragment>
  )
}

export default memo(DesktopView)
