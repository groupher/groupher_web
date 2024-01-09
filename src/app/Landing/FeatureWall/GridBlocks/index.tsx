import { FC } from 'react'

import { SexyDivider } from '@/widgets/Common'

import Slogan from './Slogan'
import {
  Wrapper,
  InnerWrapper,
  Block,
  UserIcon,
  EmojiIcon,
  LaptopIcon,
  CloudIcon,
  FingerPrintIcon,
  SearchIcon,
  Title,
  Desc,
  Line,
  Icon,
} from '../../styles/feature_wall/grid_blocks'

const GridBlocks: FC = () => {
  return (
    <Wrapper>
      <Slogan />
      <InnerWrapper>
        <SexyDivider top={0} />
        <Line left={332} top={0} />
        <Line right={332} top={0} />
        <Icon.Triangle left={325} top={-7} />
        <Icon.Circle right={325} top={-7} />
        <Icon.SqaureSrew left={325} top={164} />
        <Icon.Diamand right={325} top={164} />
        <Icon.Hexagon right={325} bottom={-7} />
        <Icon.Square left={325} bottom={-7} />

        <Block>
          <UserIcon />
          <Title>用户管理</Title>
          <Desc>自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人、精神怪胎。</Desc>
        </Block>
        <Block>
          <EmojiIcon />
          <Title>表情反馈</Title>
          <Desc>自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人</Desc>
        </Block>
        <Block>
          <SearchIcon />
          <Title>全文搜索</Title>
          <Desc>自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人</Desc>
        </Block>
        <SexyDivider />
        <Block>
          <CloudIcon />
          <Title>稳定可靠</Title>
          <Desc>自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人</Desc>
        </Block>
        <Block>
          <FingerPrintIcon />
          <Title>SSO 集成</Title>
          <Desc>自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人</Desc>
        </Block>
        <Block>
          <LaptopIcon />
          <Title>开发者友好</Title>
          <Desc>自带垃圾信息过滤机制，也对可自定义拉黑恶意账户，远离阴阳人</Desc>
        </Block>
        <SexyDivider bottom={0} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default GridBlocks
