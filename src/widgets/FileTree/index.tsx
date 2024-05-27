/*
 *
 * FileTree
 *
 */

import { type FC, memo } from 'react'
import { reverse, keys } from 'ramda'

import type { TSpace } from '@/spec'
import { groupByKey } from '@/helper'
import { mockTags } from '@/mock'

import Folder from './Folder'

import { Wrapper } from './styles'

type TProps = {
  onSelect?: () => void
} & TSpace

const FileTree: FC<TProps> = ({ onSelect, ...restProps }) => {
  const tagsData = mockTags(15)
  // console.log('## ## tagsData: ', tagsData)

  const activeTagData = tagsData[6]
  const groupedTags = groupByKey(tagsData, 'group')
  const groupsKeys = reverse(keys(groupedTags)) as string[]

  return (
    <Wrapper {...restProps}>
      {groupsKeys.map((groupKey) => (
        <Folder
          key={groupKey}
          title={groupKey}
          groupTags={groupedTags[groupKey]}
          allTags={tagsData}
          activeTag={activeTagData}
          maxDisplayCount={3}
          totalCountThrold={10}
          onSelect={() => {
            // onTagSelect(tag)
            onSelect?.()
          }}
        />
      ))}
    </Wrapper>
  )
}

export default memo(FileTree)
