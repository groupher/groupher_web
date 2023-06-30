import { FC, useCallback, useEffect, useState } from 'react'

import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import type { TPagedArticles } from '@/spec'
import { ArticleCell, StateCell, AuthorDateCell, DateCell } from '../Cell'

import { Title, SortIcon } from '../../styles/cms/posts'
import { loadArticles } from '../../logic'

/**
 * example: https://table.rsuitejs.com/#fixed-column
 * API: https://github.com/rsuite/rsuite-table#api
 */

type TProps = {
  pagedPosts: TPagedArticles
  loading: boolean
}

const PostManage: FC<TProps> = ({ pagedPosts, loading }) => {
  useEffect(() => {
    setTimeout(() => {
      loadArticles()
    }, 1000)
  }, [])

  const [sortColumn, setSortColumn] = useState('id')

  const [sortState, setSortState] = useState({
    views: '', // '' / asc / desc
    commentsCount: '',
    upvotesCount: '',
  })

  const handleSortColumn = useCallback(
    (sortColumn, sortType) => {
      setSortColumn(sortColumn)
      setSortState({ ...sortState, [sortColumn]: sortType })
    },
    [sortState],
  )

  const renderSortIcon = useCallback(
    (sortColumn) => {
      const sortType = sortState[sortColumn]

      switch (sortType) {
        case 'asc': {
          return <SortIcon.ArrowUp />
        }
        case 'desc': {
          return <SortIcon.ArrowDown />
        }

        default:
          return <SortIcon.Filter />
      }
    },
    [sortState],
  )

  return (
    <>
      <Table
        data={pagedPosts.entries}
        sortColumn={sortColumn}
        onSortColumn={handleSortColumn}
        rowHeight={68}
        loading={loading}
        autoHeight
        cellBordered
        bordered
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

        <Column width={90} fixed>
          <HeaderCell align="center">
            <Title>状态</Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <StateCell />
        </Column>

        <Column width={65} fixed sortable>
          <HeaderCell align="center" renderSortIcon={() => renderSortIcon('upvotesCount')}>
            <Title>投票</Title>
          </HeaderCell>
          <Cell dataKey="upvotesCount" align="center" />
        </Column>

        <Column width={65} sortable>
          <HeaderCell align="center" renderSortIcon={() => renderSortIcon('views')}>
            <Title>浏览</Title>
          </HeaderCell>
          <Cell dataKey="views" align="center" />
        </Column>

        <Column width={60} sortable>
          <HeaderCell align="center" renderSortIcon={() => renderSortIcon('commentsCount')}>
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
    </>
  )
}

export default PostManage
