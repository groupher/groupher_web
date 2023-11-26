import { FC, useEffect, useRef, memo } from 'react'

import 'overlayscrollbars/styles/overlayscrollbars.css'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

import { DRAWER_SCROLLER } from '@/constant/dom'
import { scrollDrawerToTop } from '@/dom'
// import CustomScroller from '@/widgets/CustomScroller'

import Content from './Content'
import { Wrapper } from '../styles/content'

type TProps = {
  visible: boolean
  type: string // TODO:
}

const DesktopView: FC<TProps> = ({ visible, type }) => {
  const ref = useRef(null)

  const options = {
    scrollbars: { autoHide: 'leave', autoHideDelay: 300, autoHideSuspend: true },
  }

  // @ts-ignore
  const [initialize, instance] = useOverlayScrollbars({ options, defer: false })

  useEffect(() => {
    if (initialize && ref?.current) {
      initialize(ref?.current)

      const instanceEl = instance?.()?.elements()
      const { viewport } = instanceEl
      window[DRAWER_SCROLLER] = viewport
      scrollDrawerToTop()
    }
  }, [initialize, ref, instance])

  return (
    <Wrapper ref={ref} type={type}>
      <Content type={type} />
    </Wrapper>
  )
}

export default memo(DesktopView)
