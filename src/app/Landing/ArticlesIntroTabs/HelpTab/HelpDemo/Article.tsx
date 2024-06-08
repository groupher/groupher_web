import type { FC } from 'react'

import useTheme from '@/hooks/useTheme'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  InnerWrapper,
  LeftArrowIcon,
  RightArrowIcon,
  InnerContent,
  Title,
  CoverWrappers,
  Cover,
  CoverTitle,
  Bar,
  ShareIcon,
  Footer,
  ArrowText,
  Feedback,
  GoodIcon,
  SodoIcon,
  BadIcon,
  CommentDot,
  CommentDotSolid,
} from '../../../styles/articles_intro_tabs/help_tab/help_demo/article'

const Article: FC = () => {
  const { themeMap } = useTheme()

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerContent>
          <ShareIcon />
          <Title>自定义帮助台封面</Title>

          <CoverWrappers>
            <Cover $fromBg={themeMap.rainbow.cyan} $toBg={themeMap.rainbow.cyanBg}>
              <CoverTitle>卡片视图</CoverTitle>
            </Cover>
            <Cover $fromBg={themeMap.rainbow.cyan} $toBg={themeMap.rainbow.cyanBg}>
              <CoverTitle>列表视图</CoverTitle>
            </Cover>
          </CoverWrappers>

          <Bar width={150} height={6} opacity={0.2} top={14} />
          <Bar width={160} height={6} opacity={0.15} top={13} />
          <Bar width={160} height={6} opacity={0.1} top={14} />
          <Bar width={120} height={6} opacity={0.1} top={16} />
          <Bar width={220} height={6} opacity={0.15} top={13} />
          <Bar width={160} height={6} opacity={0.1} top={14} />
          <Bar width={120} height={6} opacity={0.1} top={16} />
        </InnerContent>

        <CommentDot>
          <CommentDotSolid />
        </CommentDot>

        <Footer>
          <LeftArrowIcon />
          <ArrowText>编辑目录</ArrowText>
          <SpaceGrow />
          <ArrowText>文档反馈</ArrowText>
          <RightArrowIcon />
        </Footer>

        <Feedback>
          <GoodIcon />
          <SodoIcon />
          <BadIcon />
        </Feedback>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Article
