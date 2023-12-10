import { FC } from 'react'

import { mockUsers } from '@/mock'
import { ARTICLE_CAT } from '@/constant/gtd'
import ArticleCatState from '@/widgets/ArticleCatState'

import ActionsMask from './ActionsMask'

import {
  Wrapper,
  Phone,
  Brand,
  Logo,
  Community,
  Item,
  Avatar,
  Post,
  Title,
  Footer,
  //
  BlocksWrapper,
  Block,
  AndroidIcon,
  QRCodeSolidIcon,
  WechatIcon,
  ShareIcon,
} from '../../styles/feature_wall/mobile_first/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  const users = mockUsers(5)

  return (
    <Wrapper>
      <Phone $hovering={hovering}>
        <ActionsMask hovering={hovering} />
        <Brand>
          <Logo src="landing/products/groupher.png" />
          <Community>GR</Community>
        </Brand>
        <Item>
          <Avatar src={users[0].avatar} />
          <Post>
            <Title>想要改头像</Title>
            <Footer>
              <ArticleCatState cat={ARTICLE_CAT.FEATURE} noBorder left={-1} />
            </Footer>
          </Post>
        </Item>

        <Item $opacity={0.9}>
          <Avatar src={users[1].avatar} />
          <Post>
            <Title>上传附件失败</Title>
            <Footer>
              <ArticleCatState cat={ARTICLE_CAT.BUG} noBorder />
            </Footer>
          </Post>
        </Item>

        <Item $opacity={0.8}>
          <Avatar src={users[2].avatar} />
          <Post>
            <Title>怎样导出呢?</Title>
            <Footer>
              <ArticleCatState cat={ARTICLE_CAT.QUESTION} noBorder left={-3} />
            </Footer>
          </Post>
        </Item>

        <Item $opacity={0.6}>
          <Avatar src={users[3].avatar} />
          <Post>
            <Title>自定义颜色</Title>
            <Footer>
              <ArticleCatState cat={ARTICLE_CAT.FEATURE} noBorder left={-1} />
            </Footer>
          </Post>
        </Item>
      </Phone>
      <BlocksWrapper>
        <Block $hovering={hovering} />
        <Block $solid>
          <QRCodeSolidIcon />
        </Block>
        <Block $solid>
          <AndroidIcon />
        </Block>
        <Block $solid>
          <WechatIcon />
        </Block>
        <Block $hovering={hovering} />
        <Block $hovering={hovering} />
        <Block $hovering={hovering} />
        <Block $solid>
          <ShareIcon />
        </Block>
        <Block $hovering={hovering} />
      </BlocksWrapper>
    </Wrapper>
  )
}

export default Panel
