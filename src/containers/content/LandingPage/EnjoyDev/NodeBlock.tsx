import { FC } from 'react'

import type { TArticleCat } from '@/spec'
import { ARTICLE_CAT } from '@/constant/gtd'

import { SpaceGrow } from '@/widgets/Common'

import UpdateBtn from './UpdateBtn'

import {
  Wrapper,
  Header,
  Content,
  Bar,
  Icon,
  Text,
  Footer,
  LeftInfo,
  LeftText,
  LeftDot,
  RightDot,
} from '../styles/enjoy_dev/node_block'
import { getNodeBlockColors } from '../styles/enjoy_dev/metric'

type TProps = {
  cat?: TArticleCat
  index?: number
}

const METRIC = {
  [ARTICLE_CAT.FEATURE]: {
    title: '开发',
    upvoteText: '--',
    upvoteNum: 0,
    delay: 0,
  },

  [ARTICLE_CAT.FEATURE]: {
    title: '功能需求',
    upvoteText: '投票',
    upvoteNum: 13,
    delay: 3000,
  },

  [ARTICLE_CAT.OTHER]: {
    title: '讨论',
    upvoteText: '赞同',
    upvoteNum: 18,
    delay: 2000,
  },

  [ARTICLE_CAT.BUG]: {
    title: 'Bug',
    upvoteText: '同样遇到',
    upvoteNum: 9,
    delay: 4000,
  },

  [ARTICLE_CAT.QUESTION]: {
    title: '求助',
    upvoteText: '帮顶',
    upvoteNum: 6,
    delay: 5000,
  },
}

const NodeBlock: FC<TProps> = ({ cat = ARTICLE_CAT.FEATURE, index = -1 }) => {
  const metric = METRIC[cat]
  const HeadIcon = Icon[cat]

  const colors = getNodeBlockColors(cat)

  return (
    <Wrapper color={colors.border} longer={cat === ARTICLE_CAT.FEATURE}>
      {cat === ARTICLE_CAT.FEATURE && index === 0 && (
        <LeftInfo bottom="51px">
          <LeftDot bg="#888888" />
        </LeftInfo>
      )}

      {cat === ARTICLE_CAT.FEATURE && index === 1 && (
        <LeftInfo bottom="63px">
          <LeftDot bg="#B36BAA" />
          <LeftText>进行中</LeftText>
        </LeftInfo>
      )}

      {cat === ARTICLE_CAT.FEATURE && index === 1 && (
        <LeftInfo bottom="45px">
          <LeftDot bg="#828282" />
          <LeftText>sprint x</LeftText>
        </LeftInfo>
      )}

      {cat === ARTICLE_CAT.FEATURE && index === 1 && (
        <LeftInfo bottom="25px">
          <LeftDot bg="#4A6DB0" />
          <LeftText>已排期</LeftText>
        </LeftInfo>
      )}

      {cat === ARTICLE_CAT.FEATURE && index === 2 && (
        <LeftInfo bottom="63px">
          <LeftDot bg="#C98B25" />
          <LeftText>已解决</LeftText>
        </LeftInfo>
      )}

      {cat === ARTICLE_CAT.FEATURE && index === 2 && (
        <LeftInfo bottom="45px">
          <LeftDot bg="#828282" />
          <LeftText>sprint y</LeftText>
        </LeftInfo>
      )}

      {cat === ARTICLE_CAT.FEATURE && index === 2 && (
        <LeftInfo bottom="25px">
          <LeftDot bg="#DF796B" />
          <LeftText>重复问题</LeftText>
        </LeftInfo>
      )}

      <RightDot bg={colors.main} middle={cat === ARTICLE_CAT.FEATURE} />

      <Header bg={colors.headerBg}>
        <HeadIcon color={colors.main} />
        <Text color={colors.main}>{metric.title}</Text>
      </Header>
      <Content bg={colors.contentBg}>
        <Bar bg={colors.barBg} />
        <Bar bg={colors.barBg} short />
        {index === 0 && (
          <>
            <Bar bg={colors.barBg} short />
            <Bar bg={colors.barBg} />

            <Bar bg={colors.barBg} short />
            <Bar bg={colors.barBg} short />
          </>
        )}
        <SpaceGrow />
        {cat !== ARTICLE_CAT.FEATURE && (
          <Footer>
            <UpdateBtn
              text={metric.upvoteText}
              num={metric.upvoteNum}
              delay={metric.delay}
              dividerColor={colors.barBg}
              mainColor={colors.main}
            />
            <SpaceGrow />
          </Footer>
        )}
      </Content>
    </Wrapper>
  )
}

export default NodeBlock
