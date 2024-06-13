import { callTagCreateEditor } from '@/signal'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'
import Portal from '../Portal'

import ThreadSelector from './ThreadSelector'
import GroupSelector from './GroupSelector'
import TagList from './TagList'

import useTags from '../logic/useTags'
import { Wrapper, InnerWrapper, ContentWrapper, AddButton, AddIcon } from '../styles/tags'

export default () => {
  const { loading, getTagsIndexTouched } = useTags()
  const isTouched = getTagsIndexTouched()

  return (
    <Wrapper>
      <Portal title="标签设置" desc="编辑各板块标签，标签分组，颜色名称等均可编辑。" />
      <InnerWrapper>
        <ThreadSelector />
        <ContentWrapper>
          <GroupSelector />
          <TagList />
        </ContentWrapper>

        {!loading && (
          <AddButton ghost top={10} size="small" onClick={() => callTagCreateEditor()}>
            <AddIcon />
            新增标签
          </AddButton>
        )}

        <SavingBar
          isTouched={isTouched}
          field={SETTING_FIELD.TAG_INDEX}
          prefix="是否保存标签排序"
          top={24}
          left={-10}
        />
      </InnerWrapper>
    </Wrapper>
  )
}
