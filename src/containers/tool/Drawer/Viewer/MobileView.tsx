import { type FC, type ReactNode, useEffect, useState, memo, useRef } from 'react'

import useSwipe from '~/hooks/useSwipe'
import useTheme from '~/hooks/useTheme'

import type { TSwipeOption } from '../spec'
import Header from '../Header'

import useLogic from '../useLogic'
import { DrawerOverlay, DrawerWrapper, DrawerMobileContent, MobileInnerContent } from '../styles'

type TProps = {
  testid?: string
  headerText: string
  options: TSwipeOption
  visible: boolean
  type: string
  canBeClose: boolean
  showHeaderText: boolean
  disableContentDrag: boolean
  children: ReactNode
}

const Viewer: FC<TProps> = ({
  testid = 'drawer-sidebar-panel',
  headerText,
  options,
  visible,
  type,
  canBeClose,
  showHeaderText,
  disableContentDrag,
  children,
}) => {
  const { themeMap } = useTheme()
  const { closeDrawer, onSwipedYHandler, onSwipingYHandler, resetSwipeAviliable } = useLogic()
  // swipe action state for top && bottom
  // null means restore and close
  const [swipeDownY, setSwipeDownY] = useState(null)
  const [swipeUpY, setSwipeUpY] = useState(null)

  const overlayRef = useRef(null)

  // NOTE: important: reset swipe position when drawer closed
  useEffect(() => {
    // not work
    // if (visible) {
    //   if (overlayRef) {
    //     setTimeout(() => {
    //       overlayRef.current.scrollTo(0, 10)
    //     }, 200)
    //   }
    // }
    if (!visible) {
      setSwipeDownY(null)
      setSwipeUpY(null)
      resetSwipeAviliable()
    }
  }, [visible, overlayRef])

  /**
   * 注意这里有一个坑，在进入 Drawer 滑动到最底部快速往上滑动时
   * CustomScroller 不会阻止 swipe 状态，导致 swipe 状态依然在
   * 记录中，这是松手会导致 Drawer 以外关闭，需要在下层 Content 中
   * 做时间差处理
   */
  const swipeHandlers = useSwipe({
    onSwiped: (ev) => {
      if (disableContentDrag) return false
      onSwipedYHandler(ev, setSwipeUpY, setSwipeDownY)
    },
    onSwiping: (ev) => {
      if (disableContentDrag) return false
      onSwipingYHandler(ev, setSwipeUpY, setSwipeDownY)
    },
  })

  return (
    <>
      <DrawerOverlay ref={overlayRef} visible={visible} onClick={() => closeDrawer()} />
      <DrawerWrapper
        $testid={testid}
        $visible={visible}
        type={type}
        swipeUpY={swipeUpY}
        swipeDownY={swipeDownY}
        options={options}
        $mobile
      >
        <DrawerMobileContent options={options} bgColor={themeMap.drawer.bg}>
          <MobileInnerContent
            options={options}
            swipeUpY={swipeUpY}
            swipeDownY={swipeDownY}
            {...swipeHandlers}
          >
            {children}
          </MobileInnerContent>
        </DrawerMobileContent>
        <Header
          headerText={headerText}
          options={options}
          setSwipeDownY={setSwipeDownY}
          setSwipeUpY={setSwipeUpY}
          canBeClose={canBeClose}
          showHeaderText={showHeaderText}
        />
      </DrawerWrapper>
    </>
  )
}

export default memo(Viewer)
