import { type FC, memo } from 'react'

import Trend from 'react-trend'

import {
  Wrapper,
  Block,
  UsersWrapper,
  UsersIcon,
  ContentWrapper,
  ContentIcon,
  CommentsWrapper,
  CommentIcon,
  EmojisWrapper,
  EmojiIcon,
  TrendWrapper,
  TrendIcon,
  Title,
  Desc,
  Num,
  TrendLineWrapper,
} from '../styles/basic_states'

const BasicStates: FC = () => {
  return (
    <Wrapper>
      <Block>
        <TrendWrapper>
          <TrendIcon />
        </TrendWrapper>
        <Title>活跃度</Title>
        <Desc>最近 30 天</Desc>
        <TrendLineWrapper>
          <Trend
            smooth
            width={80}
            height={30}
            data={[2, 3, 6, 0, 2, 10, 8, 8, 22, 33, 2, 3, 4, 5, 6]}
            gradient={['yellowgreen', 'green']}
            radius={15}
            strokeWidth={1}
            strokeLinecap="round"
          />
        </TrendLineWrapper>
      </Block>
      <Block>
        <UsersWrapper>
          <UsersIcon />
        </UsersWrapper>
        <Title>互动人数</Title>
        <Desc>参与互动的用户</Desc>
        <Num>28</Num>
      </Block>
      <Block>
        <ContentWrapper>
          <ContentIcon />
        </ContentWrapper>
        <Title>内容</Title>
        <Desc>所有板块内容总和</Desc>
        <Num>12k</Num>
      </Block>
      <Block>
        <CommentsWrapper>
          <CommentIcon />
        </CommentsWrapper>
        <Title>评论</Title>
        <Desc>所有评论总和</Desc>
        <Num>237</Num>
      </Block>
      <Block>
        <EmojisWrapper>
          <EmojiIcon />
        </EmojisWrapper>
        <Title>回应</Title>
        <Desc>投票和表情</Desc>
        <Num>374</Num>
      </Block>
    </Wrapper>
  )
}

export default memo(BasicStates)
