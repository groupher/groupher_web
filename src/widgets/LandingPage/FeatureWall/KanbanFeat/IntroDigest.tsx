import { FC, useState, useEffect } from 'react'

import ViewportTracker from '@/widgets/ViewportTracker'
import { SpaceGrow } from '@/widgets/Common'
import useScrollDir from '@/hooks/useScrollDir'

import { FEAT_TYPE } from '../../constant'

import FeatHead from '../FeatHead'
import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { Wrapper, FeatList } from '../../styles/feature_wall/kanban_feat/intro_digest'

type TProps = {
  inViewChange: (inView: boolean) => void
}

const IntroDigest: FC<TProps> = ({ inViewChange }) => {
  const [headInView, setHeadInview] = useState(false)
  const [footInView, setFootInview] = useState(false)

  const scrollDir = useScrollDir()

  useEffect(() => {
    if (
      (headInView && footInView) ||
      (headInView && scrollDir === 'up') ||
      (footInView && scrollDir === 'up') ||
      (headInView && scrollDir === 'down') ||
      (footInView && !headInView && scrollDir === 'down')
    ) {
      inViewChange(true)
    } else {
      inViewChange(false)
    }
  }, [headInView, footInView, scrollDir, inViewChange])

  return (
    <Wrapper>
      <ViewportTracker onEnter={() => setHeadInview(true)} onLeave={() => setHeadInview(false)} />
      <FeatHead
        title="GTD 看板"
        desc="方便用户快速获取产品最新功能。"
        featType={FEAT_TYPE.KANBAN}
      />

      <FeatList>
        <FeatItem text="封面图片编辑" featType={FEAT_TYPE.KANBAN} />
        <FeatItem text="强大的富文本内容" featType={FEAT_TYPE.KANBAN} />
        <FeatItem text="按标签，版本号，时间自动归档" featType={FEAT_TYPE.KANBAN} />
        <FeatItem text="评论，表情反馈" featType={FEAT_TYPE.KANBAN} />
        <FeatItem text="一键多渠道分享" featType={FEAT_TYPE.KANBAN} />
        <FeatItem text="高度自定义" featType={FEAT_TYPE.KANBAN} />
      </FeatList>

      <SpaceGrow />
      <MoreLink href="/" featType={FEAT_TYPE.KANBAN} />

      <ViewportTracker onEnter={() => setFootInview(true)} onLeave={() => setFootInview(false)} />
    </Wrapper>
  )
}

export default IntroDigest
