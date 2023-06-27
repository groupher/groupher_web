/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

import GlobalTableStyle from '../styles/cms/global'
import { Wrapper } from '../styles/cms/post_manage'

/**
 * example: https://table.rsuitejs.com/#fixed-column
 */
const dataList = [
  {
    id: 1,
    title: '这是一篇帖子 - 1',
    upvoteCount: 34,
    commentsCount: 23,
    viewsCount: 230,
    insertedAt: '2023-02-23 13:20',
  },
  {
    id: 2,
    title: '这是一篇帖子 - 2',
    upvoteCount: 85,
    commentsCount: 3,
    viewsCount: 630,
    insertedAt: '2023-02-23 13:20',
  },
]

const PostManage: FC = () => {
  return (
    <Wrapper>
      <Table data={dataList} cellBordered bordered>
        <Column width={50} fixed>
          <HeaderCell>点赞数</HeaderCell>
          <Cell dataKey="upvoteCount" />
        </Column>

        <Column width={200} fixed>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column width={250}>
          <HeaderCell>浏览</HeaderCell>
          <Cell dataKey="viewsCount" />
        </Column>

        <Column width={250}>
          <HeaderCell>评论</HeaderCell>
          <Cell dataKey="commentsCount" />
        </Column>

        <Column width={200} fixed="right">
          <HeaderCell>时间</HeaderCell>
          <Cell dataKey="insertedAt" />
        </Column>
      </Table>

      <GlobalTableStyle />
    </Wrapper>
  )
}

export default PostManage
