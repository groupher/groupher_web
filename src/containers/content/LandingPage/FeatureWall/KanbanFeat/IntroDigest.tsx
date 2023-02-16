import { FC, useState, useEffect } from 'react'

import { DesktopOnly } from '@/widgets/Common'
import ViewportTracker from '@/widgets/ViewportTracker'
import useScrollDir from '@/hooks/useScrollDir'

import { FEAT_TYPE } from '../../constant'

import FeatHead from '../FeatHead'

import IntroItems from './IntroItems'
import { Wrapper } from '../../styles/feature_wall/kanban_feat/intro_digest'
import { checkBlockInView } from '../helper'

type TProps = {
  inViewChange: (inView: boolean) => void
  alignRight?: boolean
}

const IntroDigest: FC<TProps> = ({ inViewChange, alignRight = false }) => {
  const [inView, setInView] = useState(false)
  const [headInView, setHeadInview] = useState(false)
  const [footInView, setFootInview] = useState(false)

  const scrollDir = useScrollDir()

  useEffect(() => {
    if (checkBlockInView(headInView, footInView, scrollDir)) {
      setInView(true)
      inViewChange(true)
    } else {
      setInView(false)
      inViewChange(false)
    }
  }, [headInView, footInView, scrollDir, inViewChange])

  return (
    <Wrapper>
      <DesktopOnly>
        <ViewportTracker onEnter={() => setHeadInview(true)} onLeave={() => setHeadInview(false)} />
      </DesktopOnly>
      <FeatHead
        $active={inView}
        title="看板"
        desc="通过直观的看板展示进度，让你的用户了解团队正在进行中的工作。"
        featType={FEAT_TYPE.KANBAN}
        alignRight={alignRight}
      />

      <DesktopOnly>
        <IntroItems />

        <ViewportTracker onEnter={() => setFootInview(true)} onLeave={() => setFootInview(false)} />
      </DesktopOnly>
    </Wrapper>
  )
}

export default IntroDigest
