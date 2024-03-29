import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { callTagCreateEditor } from '@/signal'
import { sortByIndex } from '@/helper'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'
import Portal from '../Portal'

import ThreadSelector from './ThreadSelector'
import GroupSelector from './GroupSelector'
import TagBar from './TagBar'

import useTagListInfo from '../hooks/useTagListInfo'
import { Wrapper, InnerWrapper, ContentWrapper, AddButton, AddIcon } from '../styles/tags'

const Tags: FC = () => {
  const {
    tags,
    groups,
    activeTagGroup,
    activeTagThread,
    threads,
    isTagsIndexTouched,
    isTagsTouched,
  } = useTagListInfo()

  const [animateRef, enable] = useAutoAnimate()

  useEffect(() => {
    enable(false)
  }, [])

  return (
    <Wrapper>
      <Portal title="标签设置" desc="编辑各板块标签，标签分组，颜色名称等均可编辑。" />
      <InnerWrapper>
        <ThreadSelector threads={threads} active={activeTagThread} />
        <ContentWrapper ref={animateRef}>
          <GroupSelector groups={groups} active={activeTagGroup} />
          {sortByIndex(tags).map((tag, index) => (
            <TagBar
              key={tag.id}
              tag={tag}
              isFirst={index === 0}
              isLast={index === tags.length - 1}
              total={tags.length}
            />
          ))}
        </ContentWrapper>

        <AddButton ghost top={10} size="small" onClick={() => callTagCreateEditor()}>
          <AddIcon />
          新增标签
        </AddButton>

        <SavingBar
          isTouched={isTagsIndexTouched}
          field={SETTING_FIELD.TAG_INDEX}
          prefix="是否保存标签排序"
          top={24}
          left={-10}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(Tags)
