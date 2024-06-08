import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { prettyNum } from '@/fmt'

import NoteTip from '@/widgets/NoteTip'

import useOverview from '../logic/useOverview'
import { Wrapper, Left, Right, Section, Hint, Num } from '../styles/overview/basic_numbers'

const BasicNumbers: FC = () => {
  const { views, subscribersCount, postsCount, changelogsCount, docsCount } = useOverview()

  return (
    <Wrapper>
      <Left>
        <Section>
          <Hint>社区浏览</Hint>
          <Num>{prettyNum(views)}</Num>
        </Section>
      </Left>
      <Right>
        <Section>
          <Hint>
            参与互动人数
            <NoteTip left={4} placement="top">
              参与过发帖，评论，Emoji 反馈的人数
            </NoteTip>
          </Hint>
          <Num>{prettyNum(subscribersCount)}</Num>
        </Section>

        <Section>
          <Hint>帖子总数</Hint>
          <Num>{prettyNum(postsCount)}</Num>
        </Section>

        <Section>
          <Hint>更新日志总数</Hint>
          <Num>{prettyNum(changelogsCount)}</Num>
        </Section>

        <Section>
          <Hint>文档总数</Hint>
          <Num>{prettyNum(docsCount)}</Num>
        </Section>
      </Right>
    </Wrapper>
  )
}

export default observer(BasicNumbers)
