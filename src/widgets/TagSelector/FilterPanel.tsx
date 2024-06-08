import { type FC, memo } from 'react'
import { keys } from 'ramda'

import type { TTag, TGroupedTags } from '@/spec'
import TagNode from '@/widgets/TagNode'

import { Wrapper, GroupWrapper, GroupTitle, SelectItem, Title } from './styles/filter_panel'

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
      {tags.map((tag) => {
        const $active = tag.id === activeTag?.id

        return (
          <SelectItem key={tag.id} $active={$active} onClick={() => onSelect(tag)}>
            <TagNode
              color={tag.color}
              dotSize={8}
              dotRight={8}
              hashSize={10}
              hashRight={5}
              hashTop={-1}
              opacity={0.8}
              boldHash
            />
            <Title>{tag.title}</Title>
          </SelectItem>
        )
      })}
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
