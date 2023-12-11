import { FC } from 'react'

import type { TArticleCat } from '@/spec'
import { ARTICLE_CAT } from '@/constant/gtd'

import { SpaceGrow } from '@/widgets/Common'

import UpdateBtn from '../UpdateBtn'

import { getNodeBlockColors } from '../../styles/enjoy_dev/metric'
import {
  Wrapper,
  Header,
  Content,
  Bar,
  Icon,
  Text,
  Footer,
  LeftInfo,
  LeftDot,
  RightDot,
} from '../../styles/enjoy_dev/our_way/node_block'

type TProps = {
  cat?: TArticleCat | 'DEFAULT'
  index?: number
}

const METRIC = {
  DEFAULT: {
    title: '开发',
    upvoteText: 'Sprint',
    upvoteNum: 1,
    delay: 3000,
  },

  [ARTICLE_CAT.FEATURE]: {
    title: '功能需求',
    upvoteText: '支持',
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

const NodeBlock: FC<TProps> = ({ cat = 'DEFAULT', index = -1 }) => {
  const metric = METRIC[cat]
  const HeadIcon = Icon[cat]

  const colors = getNodeBlockColors(cat)

  return (
    <Wrapper color={colors.border}>
      {cat === 'DEFAULT' && index === 0 && (
        <LeftInfo bottom="39px">
          <LeftDot bg="#888888" />
        </LeftInfo>
      )}

      <RightDot bg={colors.main} middle={cat === 'DEFAULT'} />

      <Header bg={colors.headerBg}>
        <HeadIcon color={colors.main} />
        <Text color={colors.main}>{metric.title}</Text>
      </Header>
      <Content bg={colors.contentBg}>
        <Bar bg={colors.barBg} />
        <Bar bg={colors.barBg} short />
        {index === 0 && <Bar bg={colors.barBg} short />}
        <SpaceGrow />
        <Footer>
          <UpdateBtn
            text={metric.upvoteText}
            num={cat === 'DEFAULT' ? metric.upvoteNum + index : metric.upvoteNum}
            delay={metric.delay}
            dividerColor={colors.barBg}
            mainColor={colors.main}
          />
          <SpaceGrow />
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default NodeBlock
