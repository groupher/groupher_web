import type { FC } from 'react'

import type { TArticleCat } from '~/spec'
import { ARTICLE_CAT } from '~/const/gtd'

import { METRIC } from '../constant'
import UpdateCounter from './UpdateCounter'
import SprintCounter from './SprintCounter'

import { getNodeBlockColors } from '../../styles/enjoy_dev/metric'
import {
  Wrapper,
  Header,
  Content,
  AttachIcon,
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

const NodeBlock: FC<TProps> = ({ cat = 'DEFAULT', index = -1 }) => {
  const metric = METRIC[cat]
  const HeadIcon = Icon[cat]

  const colors = getNodeBlockColors(cat)

  return (
    <Wrapper $color={colors.bg}>
      {cat === ARTICLE_CAT.FEATURE && <AttachIcon.Clip $color={colors.bg} />}
      {cat === ARTICLE_CAT.QUESTION && <AttachIcon.Pin $color={colors.bg} />}
      {cat === ARTICLE_CAT.OTHER && <AttachIcon.Tag $color={colors.bg} />}
      {cat === ARTICLE_CAT.BUG && <AttachIcon.Target $color={colors.bg} />}

      {cat === 'DEFAULT' && index === 0 && (
        <LeftInfo $bottom="39px">
          <LeftDot $bg="#888888" />
        </LeftInfo>
      )}

      <RightDot $bg={colors.main} $middle={cat === 'DEFAULT'} />

      <Header>
        <HeadIcon $color={colors.bg} />
        <Text $color={colors.bg}>{metric.title}</Text>
      </Header>
      <Content $bg={colors.contentBg}>
        <Bar $bg={colors.barBg} />
        <Bar $bg={colors.barBg} $short />
        {index === 0 && <Bar $bg={colors.barBg} $short />}
        <div className="grow" />
        <Footer>
          {cat === 'DEFAULT' ? (
            <SprintCounter num={metric.upvoteNum + index} />
          ) : (
            <UpdateCounter
              text={metric.upvoteText}
              num={metric.upvoteNum}
              dividerColor={colors.barBg}
              mainColor={colors.bg}
            />
          )}
          <div className="grow" />
        </Footer>
      </Content>
    </Wrapper>
  )
}

export default NodeBlock
