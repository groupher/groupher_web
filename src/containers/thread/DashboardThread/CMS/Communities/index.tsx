import { FC, useCallback, useState } from 'react'
import { pluck } from 'ramda'

import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

import type { TID, TPagedCommunities } from '@/spec'

import Checker from '@/widgets/Checker'

import { CheckCell, CommunityCell, PendingCell, TimestampCell } from '../Cell'
import FilterBar from '../FilterBar'

import { Title, SortIcon } from '../../styles/cms/communities'
import { batchSelectAll } from '../../logic'

/**
 * example: https://table.rsuitejs.com/#fixed-column
 * API: https://github.com/rsuite/rsuite-table#api
 */

type TProps = {
  pagedCommunities: TPagedCommunities
  loading: boolean
  batchSelectedIDs: TID[]
}

const Communities: FC<TProps> = ({ pagedCommunities, loading, batchSelectedIDs }) => {
  const [showCheckColumn, setShowCheckColumn] = useState(false)
  const [sortColumn, setSortColumn] = useState('id')

  const allIDs = pluck('id', pagedCommunities.entries)
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

  console.log('## pagedCommunities.entries: ', pagedCommunities.entries)
  return (
    <>
      <FilterBar
        checkboxActive={showCheckColumn}
        triggerCheckbox={(show) => setShowCheckColumn(show)}
        selectedCount={batchSelectedIDs.length}
      />
      <Table
        data={pagedCommunities.entries}
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

        <Column width={180} fixed>
          <HeaderCell>
            <Title>名称</Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <CommunityCell />
        </Column>

        <Column width={200} fixed>
          <HeaderCell align="left" renderSortIcon={() => renderSortIcon('commentsCount')}>
            <Title>简介</Title>
          </HeaderCell>
          <Cell dataKey="desc" align="left" />
        </Column>

        <Column width={90} fixed>
          <HeaderCell align="center">
            <Title>状态</Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <PendingCell />
        </Column>

        <Column width={65} sortable>
          <HeaderCell align="center" renderSortIcon={() => renderSortIcon('commentsCount')}>
            <Title>关注</Title>
          </HeaderCell>
          <Cell dataKey="subscribersCount" align="center" />
        </Column>

        <Column width={65} sortable>
          <HeaderCell align="center" renderSortIcon={() => renderSortIcon('views')}>
            <Title>浏览</Title>
          </HeaderCell>
          <Cell dataKey="views" align="center" />
        </Column>

        <Column width={60} sortable>
          <HeaderCell align="center" renderSortIcon={() => renderSortIcon('commentsCount')}>
            <Title>内容</Title>
          </HeaderCell>
          <Cell dataKey="articlesCount" align="center" />
        </Column>

        <Column width={100}>
          <HeaderCell align="right">
            <Title>创建/更新</Title>
          </HeaderCell>
          {/* @ts-ignore */}
          <TimestampCell />
        </Column>
      </Table>
    </>
  )
}

export default Communities
