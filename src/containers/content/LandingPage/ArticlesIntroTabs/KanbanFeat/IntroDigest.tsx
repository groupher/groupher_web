import { FC } from 'react'

import { FEAT_TYPE } from '../../constant'

import FeatItem from '../FeatItem'

import {
  Wrapper,
  Digest,
  Highlight,
  InnerWrapper,
  FeatureWrapper,
  FeatureItem,
} from '../../styles/articles_intro_tabs/kanban_feat/intro_digest'

const featType = FEAT_TYPE.KANBAN

const IntroDigest: FC = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Digest>
          通过经典的看板视图，让<Highlight>用户</Highlight>直观的了解团队相关工作的
          <Highlight>计划和进度</Highlight>。
        </Digest>

        <FeatureWrapper>
          <FeatureItem>
            <FeatItem text="经典简洁的 UI" featType={featType} />
          </FeatureItem>
          <FeatureItem>
            <FeatItem text="富文本内容" featType={featType} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="状态自然同步" featType={featType} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="评论，表情反馈" featType={featType} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="一键切换状态" featType={featType} />
          </FeatureItem>

          <FeatureItem>
            <FeatItem text="高度自定义" featType={featType} />
          </FeatureItem>
        </FeatureWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default IntroDigest
