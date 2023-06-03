import { FC, memo } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { callTagCreateEditor } from '@/utils/signal'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'
import Portal from '../Portal'

import ThreadSelector from './ThreadSelector'
import GroupSelector from './GroupSelector'
import TagBar from './TagBar'

import type { TTagSettings, TTouched } from '../spec'
import { Wrapper, InnerWrapper, ContentWrapper, AddButton, AddIcon } from '../styles/tags'

type TProps = {
  settings: TTagSettings
  touched: TTouched
}

const Tags: FC<TProps> = ({ settings, touched }) => {
  const { tags, editingTag, settingTag, groups, activeTagGroup, activeTagThread, threads } =
    settings

  const [animateRef] = useAutoAnimate()

  return (
    <Wrapper>
      <Portal title="标签设置" desc="编辑各板块标签，标签分组，颜色名称等均可编辑。" />
      <InnerWrapper>
        <ThreadSelector threads={threads} active={activeTagThread} />
        <ContentWrapper ref={animateRef}>
          <GroupSelector groups={groups} active={activeTagGroup} />
          {tags.map((tag, index) => (
            <TagBar
              key={tag.id}
              tag={tag}
              editingTag={editingTag}
              settingTag={settingTag}
              isFirst={index === 0}
              isLast={index === tags.length - 1}
              activeTagGroup={activeTagGroup}
            />
          ))}
        </ContentWrapper>

        <AddButton ghost left={-8} top={10} size="small" onClick={() => callTagCreateEditor()}>
          <AddIcon />
          新增标签
        </AddButton>

        <SavingBar
          isTouched={touched.tagsIndex}
          field={SETTING_FIELD.TAG_INDEX}
          top={24}
          left={-10}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(Tags)
