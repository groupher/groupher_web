import { FC, useState, useEffect } from 'react'

import ViewportTracker from '@/widgets/ViewportTracker'
import { SpaceGrow } from '@/widgets/Common'
import useScrollDir from '@/hooks/useScrollDir'

import { FEAT_TYPE } from '../../constant'

import FeatHead from '../FeatHead'
import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { Wrapper, FeatList } from '../../styles/feature_wall/discuss_feat/intro_digest'
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
        title="讨论区"
        desc="强大的社区功能，满足用户与团队间的互动交流，让用户成为产品团队的一员。"
        featType={FEAT_TYPE.DISCUSS}
      />

      <FeatList>
        <FeatItem text="封面图片编辑" featType={FEAT_TYPE.DISCUSS} />
        <FeatItem text="强大的富文本内容" featType={FEAT_TYPE.DISCUSS} />
        <FeatItem text="评论，表情反馈" featType={FEAT_TYPE.DISCUSS} />
        <FeatItem text="一键多渠道分享" featType={FEAT_TYPE.DISCUSS} />
        <FeatItem text="高度自定义" featType={FEAT_TYPE.DISCUSS} />
      </FeatList>

      <SpaceGrow />
      <MoreLink href="/" featType={FEAT_TYPE.DISCUSS} />

      <ViewportTracker onEnter={() => setFootInview(true)} onLeave={() => setFootInview(false)} />
    </Wrapper>
  )
}

export default IntroDigest
