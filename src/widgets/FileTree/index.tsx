/*
 *
 * FileTree
 *
 */

import { FC, memo } from 'react'
import { reverse, keys } from 'ramda'

import { buildLog } from '@/utils/logger'
import { groupByKey } from '@/utils/helper'
import { mockTags } from '@/utils/mock'

import Folder from './Folder'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:FileTree:index')

type TProps = {
  testid?: string
  onSelect?: () => void
}

const FileTree: FC<TProps> = ({ testid = 'file-tree', onSelect }) => {
  const tagsData = mockTags(15)
  // console.log('## tagsData: ', tagsData)

  const activeTagData = tagsData[6]
  const groupedTags = groupByKey(tagsData, 'group')
  const groupsKeys = reverse(keys(groupedTags)) as string[]

  return (
    <Wrapper>
      {groupsKeys.map((groupKey) => (
        <Folder
          key={groupKey}
          title={groupKey}
          groupTags={groupedTags[groupKey]}
          allTags={tagsData}
          activeTag={activeTagData}
          maxDisplayCount={3}
          totalCountThrold={10}
          onSelect={(tag) => {
            // onTagSelect(tag)
            onSelect?.()
          }}
        />
      ))}
    </Wrapper>
  )
}

export default memo(FileTree)
