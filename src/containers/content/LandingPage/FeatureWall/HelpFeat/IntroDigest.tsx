import { FC, useState, useEffect } from 'react'

import ViewportTracker from '@/widgets/ViewportTracker'
import { SpaceGrow } from '@/widgets/Common'
import useScrollDir from '@/hooks/useScrollDir'

import { FEAT_TYPE } from '../../constant'

import FeatHead from '../FeatHead'
import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { Wrapper, FeatList } from '../../styles/feature_wall/help_feat/intro_digest'
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
        title="帮助台"
        desc="沉淀常见问题，公共知识库，操作指南等，快速解决用户疑惑。"
        featType={FEAT_TYPE.HELP}
      />

      <FeatList>
        <FeatItem text="保存即发布，No bullshit" featType={FEAT_TYPE.HELP} />
        <FeatItem text="支持 MD 格式导入" featType={FEAT_TYPE.HELP} />
        <FeatItem text="富文本内容" featType={FEAT_TYPE.HELP} />
        <FeatItem text="多种目录封面" featType={FEAT_TYPE.HELP} />
        <FeatItem text="表情反馈" featType={FEAT_TYPE.HELP} />
        <FeatItem text="默认好看" featType={FEAT_TYPE.HELP} />
        <FeatItem text="高度自定义" featType={FEAT_TYPE.HELP} />
      </FeatList>

      <SpaceGrow />
      <MoreLink href="/" featType={FEAT_TYPE.HELP} />

      <ViewportTracker onEnter={() => setFootInview(true)} onLeave={() => setFootInview(false)} />
    </Wrapper>
  )
}

export default IntroDigest
