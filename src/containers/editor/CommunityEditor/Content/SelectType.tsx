/*
 *
 * Content
 *
 */

import ArrowLinker from '~/widgets/ArrowLinker'

import DemoCommunity from './DemoCommunity'
import COMMUNITY_INTRO from './communityIntros'

import useLogic from '../useLogic'
import {
  Wrapper,
  LeftBlock,
  RightBlock,
  Header,
  FaqIcon,
  DemoIcon,
  Title,
  Desc,
  CommunityDemoWrapper,
} from '../styles/content/select_type'

export default () => {
  const { communityType } = useLogic()

  if (!communityType) return null
  const intro = COMMUNITY_INTRO[communityType]

  return (
    <Wrapper>
      <LeftBlock>
        <Header>
          <FaqIcon />
          <Title>{intro.title}</Title>
        </Header>
        <Desc>{intro.desc}</Desc>
        <br />
        <ArrowLinker href="/">查看详细</ArrowLinker>
      </LeftBlock>
      <RightBlock>
        <Header>
          <DemoIcon />
          <Title>示例社区</Title>
        </Header>
        <CommunityDemoWrapper>
          {intro.demos.map((item) => (
            <DemoCommunity key={item.slug} item={item} />
          ))}
        </CommunityDemoWrapper>

        <ArrowLinker href="/">探索更多</ArrowLinker>
      </RightBlock>
    </Wrapper>
  )
}
