import { FC, useState, useRef, useEffect } from 'react'
import { findIndex, reverse } from 'ramda'

import type { TTag } from '@/spec'
import { sortByColor } from '@/helper'

import FileItem from './FileItem'

import {
  Wrapper,
  Header,
  ArrowIcon,
  Title,
  FolderTitle,
  ArrowHintIcon,
  Content,
  SubToggle,
  SubToggleTitle,
} from './styles/folder'

type TProps = {
  title: string
  allTags: TTag[]
  activeTag: TTag
  groupTags: TTag[]
  maxDisplayCount: number
  totalCountThrold: number

  onSelect: (tag?: TTag) => void
}

const Folder: FC<TProps> = ({
  title,
  groupTags,
  allTags,
  activeTag,
  maxDisplayCount,
  totalCountThrold,
  onSelect,
}) => {
  // 决定是否显示 '展示更多' 的时候参考标签总数
  const needSubToggle = allTags?.length > totalCountThrold && groupTags.length > maxDisplayCount

  const initDisplayCount = needSubToggle ? maxDisplayCount : groupTags.length

  const [isFolderOpen, toggleFolder] = useState(true)
  const [curDisplayCount, setCurDisplayCount] = useState(initDisplayCount)

  const sortedTags = reverse(sortByColor(groupTags))

  // @ts-ignore
  const isActiveTagInFolder = findIndex((item) => item.id === activeTag.id, groupTags) >= 0

  const subToggleRef = useRef(null)
  // 当选中的 Tag 被折叠在展示更多里面时，将其展开
  useEffect(() => {
    if (subToggleRef && isActiveTagInFolder) {
      setCurDisplayCount(groupTags.length)
    }
  }, [subToggleRef, isActiveTagInFolder, groupTags])

  return (
    <Wrapper>
      <Header
        show={title !== 'null'}
        onClick={() => {
          toggleFolder(!isFolderOpen)

          // 当关闭 Folder 的时候，如果当前 Folder 没有被激活的 Tag, 那么就回到折叠状态
          // 如果有，那么保持原来的状态
          if (isFolderOpen && !isActiveTagInFolder) {
            setCurDisplayCount(initDisplayCount)
          }
        }}
      >
        <Title>
          <FolderTitle $isOpen={isFolderOpen}>{title}</FolderTitle>
          {!isFolderOpen && <ArrowIcon $isOpen={isFolderOpen} />}
          {isFolderOpen && <ArrowHintIcon />}
        </Title>
      </Header>

      <Content $isOpen={isFolderOpen}>
        {sortedTags.slice(0, curDisplayCount).map((tag) => (
          <FileItem
            key={tag.slug}
            tag={tag}
            active={activeTag.title === tag.title}
            onSelect={onSelect}
          />
        ))}
        {needSubToggle && (
          <SubToggle
            ref={subToggleRef}
            onClick={() => {
              setCurDisplayCount(
                curDisplayCount === maxDisplayCount ? groupTags.length : maxDisplayCount,
              )
            }}
          >
            <SubToggleTitle>{curDisplayCount === maxDisplayCount ? '展开' : '收起'}</SubToggleTitle>
          </SubToggle>
        )}
      </Content>
    </Wrapper>
  )
}

export default Folder
