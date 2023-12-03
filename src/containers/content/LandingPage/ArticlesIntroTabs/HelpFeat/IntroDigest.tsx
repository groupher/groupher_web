import { FC, useState, useEffect } from 'react'

import useScrollDir from '@/hooks/useScrollDir'

import { DesktopOnly } from '@/widgets/Common'
import ViewportTracker from '@/widgets/ViewportTracker'

import { FEAT_TYPE } from '../../constant'
import FeatHead from '../FeatHead'
import IntroItems from './IntroItems'

import { Wrapper } from '../../styles/articles_intro_tabs/help_feat/intro_digest'
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
        title="帮助台"
        desc="沉淀常见问题，公共知识库，操作指南等，快速解决用户疑惑。"
        featType={FEAT_TYPE.HELP}
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
