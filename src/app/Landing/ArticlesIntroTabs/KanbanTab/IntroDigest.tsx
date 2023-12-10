import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'

import FeatItem from '../FeatItem'

import {
  Wrapper,
  Digest,
  Highlight,
  InnerWrapper,
  FeatureWrapper,
  FeatureItem,
} from '../../styles/articles_intro_tabs/kanban_tab/intro_digest'

const IntroDigest: FC = () => {
  const color = COLOR_NAME.BLUE

  return (
    <Wrapper>
      <InnerWrapper>
        <Digest>
          通过经典的看板视图，让<Highlight>用户</Highlight>直观的了解团队相关工作的
          <Highlight>计划和进度</Highlight>。
        </Digest>

        <FeatureWrapper>
          <FeatureItem>
            <FeatItem text="经典简洁的 UI" color={color} />
          </FeatureItem>
          <FeatureItem>
            <FeatItem text="富文本内容" color={color} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="状态自然同步" color={color} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="评论，表情反馈" color={color} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="一键切换状态" color={color} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="高度自定义" color={color} />
          </FeatureItem>
        </FeatureWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default IntroDigest
