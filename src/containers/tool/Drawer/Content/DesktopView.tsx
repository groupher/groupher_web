import { FC, useEffect, useRef, memo } from 'react'

import { DRAWER_SCROLLER } from '@/constant'
import CustomScroller from '@/widgets/CustomScroller'

import type { TExtraInfo } from '../spec'
import Content from './Content'
import { Wrapper } from '../styles/content'
import { isViewerMode } from '../styles/metrics'

type TProps = {
  visible: boolean
  type: string // TODO:
  attUser: any // TODO:
  extraInfo: TExtraInfo
}

const DesktopView: FC<TProps> = ({ visible, type, attUser, extraInfo }) => {
  const ref = useRef(null)

  /*
   * reset when content visible
   * scroll to top always
   */
  useEffect(() => {
    if (visible && ref?.current) {
      ref.current.scrollIntoView()
    }
  }, [visible, ref])

  if (isViewerMode(type)) {
    return (
      <Wrapper>
        <CustomScroller
          instanceKey={DRAWER_SCROLLER}
          direction="vertical"
          height="100vh"
          barSize="medium"
          showShadow={false}
        >
          <Content type={type} attUser={attUser} extraInfo={extraInfo} />
        </CustomScroller>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Content type={type} attUser={attUser} extraInfo={extraInfo} />
    </Wrapper>
  )
}

export default memo(DesktopView)
