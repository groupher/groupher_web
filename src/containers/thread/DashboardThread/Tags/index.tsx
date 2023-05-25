import { FC, memo } from 'react'

import { callTagCreateEditor } from '@/utils/signal'

import Portal from '../Portal'

import ThreadSelector from './ThreadSelector'
import CategorySelector from './CategorySelector'
import TagBar from './TagBar'

import type { TTagSettings } from '../spec'
import { Wrapper, InnerWrapper, ContentWrapper, AddButton, AddIcon } from '../styles/tags'

type TProps = {
  settings: TTagSettings
}

const Tags: FC<TProps> = ({ settings }) => {
  const { tags, editingTag, settingTag, categories, activeTagCategory, activeTagThread, threads } =
    settings

  return (
    <Wrapper>
      <Portal title="标签设置" desc="编辑各板块标签，标签分组，颜色名称等均可编辑。" />
      <InnerWrapper>
        <ThreadSelector threads={threads} active={activeTagThread} />
        <ContentWrapper>
          <CategorySelector categories={categories} active={activeTagCategory} />
          {tags.map((tag) => (
            <TagBar key={tag.id} tag={tag} editingTag={editingTag} settingTag={settingTag} />
          ))}
        </ContentWrapper>

        <AddButton ghost left={-8} top={10} size="small" onClick={() => callTagCreateEditor()}>
          <AddIcon />
          新增标签
        </AddButton>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(Tags)
