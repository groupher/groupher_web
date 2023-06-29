import { FC, useEffect } from 'react'

import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import type { TCMSPosts } from '../spec'

import { ArticleCell, StateCell, AuthorDateCell, DateCell } from './Cell'

import GlobalTableStyle from '../styles/cms/global'
import { Wrapper, UpvoteIcon, Title } from '../styles/cms/post_manage'

import { loadArticles } from '../logic'

/**
 * example: https://table.rsuitejs.com/#fixed-column
 */

type TProps = {
  cmsPosts: TCMSPosts
}

const PostManage: FC<TProps> = ({ cmsPosts }) => {
  useEffect(() => {
    setTimeout(() => {
      loadArticles()
    }, 1000)
  }, [])

  const { loading, pagedPosts } = cmsPosts
  if (loading) {
    return <LavaLampLoading />
  }

  return (
    <Wrapper>
      <Table
        data={pagedPosts.entries}
        cellBordered
        bordered
        height={1000}
        rowHeight={() => {
          return 68
        }}
      >
        <Column width={280} fixed>
          <HeaderCell>
            <Title
              onClick={() => {
                loadArticles()
              }}
            >
              标题
            </Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <ArticleCell dataKey="title" />
        </Column>

        <Column width={100} fixed>
          <HeaderCell align="center">
            <Title>状态</Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <StateCell />
        </Column>

        <Column width={50} fixed>
          <HeaderCell align="center">
            <UpvoteIcon />
          </HeaderCell>
          <Cell dataKey="upvotesCount" align="center" />
        </Column>

        <Column width={60}>
          <HeaderCell align="center">
            <Title>浏览</Title>
          </HeaderCell>
          <Cell dataKey="views" align="center" />
        </Column>

        <Column width={60}>
          <HeaderCell align="center">
            <Title>评论</Title>
          </HeaderCell>
          <Cell dataKey="commentsCount" align="center" />
        </Column>

        <Column width={100}>
          <HeaderCell align="right">
            <Title>发布/活跃</Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <DateCell />
        </Column>

        <Column width={110}>
          <HeaderCell align="right">
            <Title>作者</Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <AuthorDateCell />
        </Column>
      </Table>

      <GlobalTableStyle />
    </Wrapper>
  )
}

export default PostManage
