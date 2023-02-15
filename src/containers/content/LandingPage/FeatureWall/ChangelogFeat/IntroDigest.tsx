import { FC, useState, useEffect } from 'react'

import ViewportTracker from '@/widgets/ViewportTracker'

import { DesktopOnly } from '@/widgets/Common'
import useScrollDir from '@/hooks/useScrollDir'

import { FEAT_TYPE } from '../../constant'

import FeatHead from '../FeatHead'

import IntroItems from './IntroItems'

import { Wrapper } from '../../styles/feature_wall/changelog_feat/intro_digest'
import { checkBlockInView } from '../helper'

type TProps = {
  inViewChange: (inView: boolean) => void
}

const IntroDigest: FC<TProps> = ({ inViewChange }) => {
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
      <ViewportTracker onEnter={() => setHeadInview(true)} onLeave={() => setHeadInview(false)} />
      <FeatHead
        $active={inView}
        title="更新日志"
        desc="官方发布更新日志，方便用户快速获取产品最新功能。"
        featType={FEAT_TYPE.CHANGELOG}
      />

      <DesktopOnly>
        <IntroItems />
      </DesktopOnly>

      <ViewportTracker onEnter={() => setFootInview(true)} onLeave={() => setFootInview(false)} />
    </Wrapper>
  )
}

export default IntroDigest
