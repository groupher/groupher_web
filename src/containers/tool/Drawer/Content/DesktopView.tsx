import { FC, useEffect, useRef, memo, useState } from 'react'

import { useOverlayScrollbars } from 'overlayscrollbars-react'

import { DRAWER_SCROLLER } from '@/constant/dom'
import { scrollDrawerToTop } from '@/dom'
// import CustomScroller from '@/widgets/CustomScroller'

import Content from './Content'
import { Wrapper } from '../styles/content'

type TProps = {
  type: string // TODO:
}

const DesktopView: FC<TProps> = ({ type }) => {
  // OverlayScrollbars 插件在第一次初始化 dynamic Comp 时会出错，相当恶心
  // 需要一个机制，即等待 dynamic Comp 加载成功以后再初始化 scrollbar
  const [dynamicLoad, setDynamicLoad] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    return () => {
      setTimeout(() => setDynamicLoad(false), 50)
    }
  }, [])

  const options = {
    scrollbars: { autoHide: 'leave', autoHideDelay: 500, autoHideSuspend: false },
  }

  // @ts-ignore
  const [initialize, instance] = useOverlayScrollbars({ options, defer: false })

  useEffect(() => {
    if (initialize && ref?.current && dynamicLoad) {
      if (dynamicLoad) {
        initialize(ref?.current)
        const instanceEl = instance?.()?.elements()
        const { viewport } = instanceEl
        window[DRAWER_SCROLLER] = viewport
        scrollDrawerToTop()
      }
    }
  }, [initialize, ref, instance, dynamicLoad])

  return (
    <Wrapper ref={ref} type={type}>
      <Content type={type} onLoad={() => setDynamicLoad(true)} />
    </Wrapper>
  )
}

export default memo(DesktopView)
