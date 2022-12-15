/*
 *
 * KanbanItem
 *
 */

import { FC, memo, useState, useEffect } from 'react'

import { buildLog } from '@/utils/logger'
import { mockUsers } from '@/utils/mock'
import { getRandomInt } from '@/utils/helper'
import { UPVOTE_LAYOUT } from '@/constant'
import CommentsCount from '@/widgets/CommentsCount'
import { Row, Space } from '@/widgets/Common'

// import IconButton from '@/widgets/Buttons/IconButton'
import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import TagsList from '@/widgets/TagsList'

import { Wrapper, Header, Footer, Title, Desc } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:KanbanItem:index')

type TProps = {
  testid?: string
}

const KanbanItem: FC<TProps> = ({ testid = 'gtd-item' }) => {
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    setUpvoteCount(getRandomInt(0, 100))
    setCommentCount(getRandomInt(0, 5))
  }, [])

  const tags = [
    {
      title: 'Groupher',
      raw: 'raw',
      color: 'red',
    },
  ]

  // const upvoteCount = 10 // getRandomInt(0, 100)
  // const commentCount = 5 // getRandomInt(0, 5)

  return (
    <Wrapper testid={testid}>
      <Header>
        <TagsList items={tags} left={2} />
        {/* <IconButton path="shape/more.svg" /> */}
      </Header>
      <Title>增加看板，更新日志，与常见问题的功能和其他</Title>
      <Desc>服务于团队开发流程，以社区服务为基础，提供反馈社区工具箱，各种个性化设置等等</Desc>
      <Footer>
        <Row>
          <Upvote count={upvoteCount} avatarList={mockUsers(3)} type={UPVOTE_LAYOUT.SIMPLE} />
          <Space right={15} />
          {commentCount !== 0 && <CommentsCount count={commentCount} size="medium" />}
        </Row>
        <ArticleCatState cat="FEATURE" noBg />
        {/* <ArticleCatState cat="LOCK" state="LOCK" noBg /> */}
        {/* <ArticleCatState cat="QUESTION" state="RESOLVE" noBg /> */}
      </Footer>
    </Wrapper>
  )
}

export default memo(KanbanItem)
