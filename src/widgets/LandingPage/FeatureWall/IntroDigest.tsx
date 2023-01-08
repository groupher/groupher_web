import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  Title,
  Desc,
  FeatList,
  FeatItem,
  CheckIcon,
  FeatText,
  MoreLink,
  MoreText,
  ArrowIcon,
} from '../styles/feature_wall/intro_digest'

const FeatureWall: FC = () => {
  return (
    <Wrapper>
      <Title>更新日志</Title>
      <Desc>方便用户快速获取产品最新功能。</Desc>

      <FeatList>
        <FeatItem>
          <CheckIcon />
          <FeatText>封面图片编辑</FeatText>
        </FeatItem>

        <FeatItem>
          <CheckIcon />
          <FeatText>强大的富文本内容</FeatText>
        </FeatItem>

        <FeatItem>
          <CheckIcon />
          <FeatText>按标签，版本号，时间自动归档</FeatText>
        </FeatItem>

        <FeatItem>
          <CheckIcon />
          <FeatText>评论，表情反馈</FeatText>
        </FeatItem>

        <FeatItem>
          <CheckIcon />
          <FeatText>一键多渠道分享</FeatText>
        </FeatItem>

        <FeatItem>
          <CheckIcon />
          <FeatText>高度自定义</FeatText>
        </FeatItem>
      </FeatList>

      <SpaceGrow />

      <MoreLink href="/">
        <MoreText>了解更多</MoreText>
        <ArrowIcon />
      </MoreLink>
    </Wrapper>
  )
}

export default FeatureWall
