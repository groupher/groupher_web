import { FC, memo } from 'react'
import { keys } from 'ramda'

import type { TTag, TGroupedTags } from '@/spec'

import {
  Wrapper,
  GroupWrapper,
  GroupTitle,
  SelectItem,
  DotSign,
  Title,
} from './styles/filter_panel'

type TProps = {
  activeTag: TTag
  groupedTags: TGroupedTags
  onSelect: (tag: TTag) => void
}

type TGroupTags = {
  tags: TTag[]
  activeTag
  onSelect: (tag: TTag) => void
}
const GroupTags: FC<TGroupTags> = ({ tags, activeTag, onSelect }) => {
  return (
    <GroupWrapper>
      {tags.map((tag) => (
        <SelectItem
          key={tag.id}
          active={tag.id === activeTag.id}
          onClick={() => onSelect(tag)}
        >
          <DotSign color={tag.color} />
          <Title>{tag.title}</Title>
        </SelectItem>
      ))}
    </GroupWrapper>
  )
}

const FilterPanel: FC<TProps> = ({ groupedTags, activeTag, onSelect }) => {
  return (
    <Wrapper>
      {keys(groupedTags).map((title) => {
        return (
          <div key={title as string}>
            <GroupTitle>{title}</GroupTitle>
            <GroupTags
              tags={groupedTags[title as string]}
              onSelect={onSelect}
              activeTag={activeTag}
            />
          </div>
        )
      })}
    </Wrapper>
  )
}

export default memo(FilterPanel)
