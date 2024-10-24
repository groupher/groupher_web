/*
 *
 * ChangelogItem
 *
 */

import { type FC, memo } from 'react'

import { cutRest } from '~/fmt'

import Cover from './Cover'

import {
  Wrapper,
  Main,
  Side,
  Title,
  Body,
  Version,
  DateTime,
  TagsWrapper,
  TagDot,
} from '../styles/outline_layout'

type TProps = {
  testid?: string
}

const OutlineLayout: FC<TProps> = ({ testid = 'changelog-item' }) => {
  const title = '更新日志界面改动，样式调整'

  return (
    <Wrapper $testid={testid}>
      <Cover />
      <Main>
        <Title>
          <span>{cutRest(title, 160)}</span>
          <Version>v3.20</Version>
        </Title>
        <Body>
          这次俄乌冲突出现侮辱乌女性的评论就是1450干的，刷完评论就截图转发外网，成为外媒攻击中国人的“口实”。
        </Body>
      </Main>
      <Side>
        <DateTime>10天前</DateTime>
        <TagsWrapper>
          <TagDot color="red" />
          <TagDot color="green" />
          <TagDot color="purple" />
        </TagsWrapper>
      </Side>
    </Wrapper>
  )
}

export default memo(OutlineLayout)
