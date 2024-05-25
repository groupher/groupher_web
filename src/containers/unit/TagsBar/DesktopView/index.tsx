/*
 *
 * TagsBar
 *
 */
import { type FC, useMemo } from 'react'
import { keys, reverse } from 'ramda'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import type { TProps as TTagProps } from '..'

import { useStore } from '../store'
import GobackTag from './GobackTag'
import Folder from './Folder'

import { Wrapper } from '../styles/desktop_view'
import { useInit, onTagSelect } from '../logic'

const _log = buildLog('C:TagsBar')

type TProps = Omit<TTagProps, 'view'>

const TagsBar: FC<TProps> = ({ onSelect }) => {
  const store = useStore()
  useInit(store)
  const community = useViewingCommunity()

  const { activeTagData, maxDisplayCount, totalCountThrold } = store

  // TODO: thread is also need for deps
  const tagsData = useMemo(() => store.tagsData, [community.slug])
  const groupedTags = useMemo(() => store.groupedTags, [community.slug])

  const groupsKeys = reverse(keys(groupedTags)) as string[]

  return (
    <Wrapper>
      {activeTagData.title && (
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
          allTags={tagsData}
          activeTag={activeTagData}
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

export default observer(TagsBar)
