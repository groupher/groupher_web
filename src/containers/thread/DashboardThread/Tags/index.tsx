import { callTagCreateEditor } from '@/signal'

import Portal from '../Portal'

import ThreadSelector from './ThreadSelector'
import GroupSelector from './GroupSelector'
import TagList from './TagList'
import Footer from './Footer'

import { Wrapper, InnerWrapper, ContentWrapper, AddButton, AddIcon } from '../styles/tags'

export default () => {
  return (
    <Wrapper>
      <Portal title="标签设置" desc="编辑各板块标签，标签分组，颜色名称等均可编辑。" />
      <InnerWrapper>
        <ThreadSelector />
        <ContentWrapper>
          <GroupSelector />
          <TagList />
        </ContentWrapper>

        <AddButton ghost top={10} size="small" onClick={() => callTagCreateEditor()}>
          <AddIcon />
          新增标签
        </AddButton>

        <Footer />
      </InnerWrapper>
    </Wrapper>
  )
}
