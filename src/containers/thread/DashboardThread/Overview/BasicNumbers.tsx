import { FC } from 'react'

import { prettyNum } from '@/utils/fmt'

import NoteTip from '@/widgets/NoteTip'

import type { TProps as TIndexProps } from '.'

import { Wrapper, Left, Right, Section, Hint, Num } from '../styles/overview/basic_numbers'

type TProps = Pick<TIndexProps, 'data'>

const BasicNumbers: FC<TProps> = ({ data }) => {
  const { views, subscribersCount, postsCount, changelogsCount, docsCount } = data

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

export default BasicNumbers
