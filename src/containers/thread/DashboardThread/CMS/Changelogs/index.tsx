import { useCallback, useState } from 'react'
import { pluck } from 'ramda'

import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import Checker from '~/widgets/Checker'

import { CheckCell, ArticleCell, StateCell, AuthorDateCell, DateCell } from '../Cell'
import FilterBar from '../FilterBar'

import useCMSInfo from '../../hooks/useCMSInfo'
import { Title, SortIcon } from '../../salon/cms/changelogs'

/**
 * example: https://table.rsuitejs.com/#fixed-column
 * API: https://github.com/rsuite/rsuite-table#api
 */
export default () => {
  const { pagedChangelogs, loading, batchSelectedIDs, batchSelectAll, loadChangelogs } =
    useCMSInfo()
  const [showCheckColumn, setShowCheckColumn] = useState(false)
  const [sortColumn, setSortColumn] = useState('id')

  const allIDs = pluck('id', pagedChangelogs.entries)
  const isAllSelected = allIDs.length === batchSelectedIDs?.length

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
      <FilterBar
        checkboxActive={showCheckColumn}
        triggerCheckbox={(show) => setShowCheckColumn(show)}
        selectedCount={batchSelectedIDs.length}
      />

      <Table
        data={pagedChangelogs.entries}
        sortColumn={sortColumn}
        onSortColumn={handleSortColumn}
        rowHeight={68}
        loading={loading}
        hover={false}
        autoHeight
        cellBordered
        bordered
      >
        {showCheckColumn && (
          <Column width={40} fixed>
            <HeaderCell>
              <Checker
                checked={isAllSelected}
                size="small"
                top={4}
                onChange={(checked) => {
                  if (checked) {
                    batchSelectAll(true, allIDs)
                    return
                  }

                  batchSelectAll(false, [])
                }}
              />
            </HeaderCell>
            {/* @ts-ignore */}
            <CheckCell />
          </Column>
        )}

        <Column width={280} fixed>
          <HeaderCell>
            <Title onClick={() => loadChangelogs()}>标题</Title>
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
