/*
 * TagsBar
 */

import { type FC, useEffect } from 'react'
import { keys, reverse } from 'ramda'

import type { TProps as TTagProps } from '..'

import GobackTag from './GobackTag'
import Folder from './Folder'

import useLogic from '../useLogic'
import { Wrapper } from '../styles/desktop_view'

type TProps = Omit<TTagProps, 'view'>

const TagsBar: FC<TProps> = ({ onSelect }) => {
  const {
    tags,
    activeTag,
    maxDisplayCount,
    totalCountThrold,
    getGroupedTags,
    onTagSelect,
    syncActiveTagFromURL,
  } = useLogic()

  console.log('## tags: ', tags)

  useEffect(() => {
    syncActiveTagFromURL()
  }, [])

  const groupedTags = getGroupedTags()
  const groupsKeys = reverse(keys(groupedTags)) as string[]

  return (
    <Wrapper>
      {activeTag?.title && (
        <GobackTag
          onSelect={(tag) => {
            onTagSelect(tag)
            onSelect?.()
          }}
        />
      )}
      {groupsKeys.map((groupKey) => (
        <Folder
          key={groupKey}
          title={groupKey}
          groupTags={groupedTags[groupKey]}
          allTags={tags}
          activeTag={activeTag}
          maxDisplayCount={maxDisplayCount}
          totalCountThrold={totalCountThrold}
          onSelect={(tag) => {
            onTagSelect(tag)
            onSelect?.()
          }}
        />
      ))}
    </Wrapper>
  )
}

export default TagsBar
