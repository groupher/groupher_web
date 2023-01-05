/*
 *
 * KanbanItem
 *
 */

import { FC, memo, useState, useEffect } from 'react'

import { buildLog } from '@/utils/logger'
import { mockTags, mockUsers } from '@/utils/mock'
import { getRandomInt } from '@/utils/helper'
import { UPVOTE_LAYOUT } from '@/constant/layout'
import CommentsCount from '@/widgets/CommentsCount'
import { Row, Space } from '@/widgets/Common'

// import IconButton from '@/widgets/Buttons/IconButton'
import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import TagsList from '@/widgets/TagsList'

import { Wrapper, Header, Footer, Title } from './styles/simple'

/* eslint-disable-next-line */
const log = buildLog('w:KanbanItem:index')

const TITLES = [
  '发布帖子支持封面图设置',
  '后台设置编辑帖子时候可以让用户选择多个标签',
  '暗黑模式',
  '不同标签支持不同展示模式',
  '后台统计分析模块',
  '看板支持标签过滤，里程碑等',
  '更新日志封面编辑器',
  '支持团管理员更改帖子标题',
]

type TProps = {
  testid?: string
}

const KanbanItem: FC<TProps> = ({ testid = 'gtd-item' }) => {
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [titleIdx, setTitleIdx] = useState(0)

  useEffect(() => {
    setUpvoteCount(getRandomInt(0, 100))
    setCommentCount(getRandomInt(0, 5))
    setTitleIdx(getRandomInt(0, 7))
  }, [])

  const tags = mockTags(8)

  return (
    <Wrapper testid={testid}>
      <Header>
        <TagsList items={[tags[titleIdx]]} left={2} />
        {/* <IconButton path="shape/more.svg" /> */}
      </Header>
      <Title>{TITLES[titleIdx]}</Title>
      <Footer>
        <Row>
          <Upvote count={upvoteCount} avatarList={mockUsers(3)} type={UPVOTE_LAYOUT.SIMPLE} />
          <Space right={15} />
          {commentCount !== 0 && <CommentsCount count={commentCount} size="medium" />}
        </Row>
        <ArticleCatState cat="FEATURE" noBg />
      </Footer>
    </Wrapper>
  )
}

export default memo(KanbanItem)
