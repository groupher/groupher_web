import { FC } from 'react'

import MainList from './MainList'
import EditorPreview from './EditorPreview'
import EmotionBar from './EmotionBar'
import EmotionBarBad from './EmotionBarBad'

import { Wrapper } from '../../../styles/articles_intro_tabs/changelog_feat/changelog_demo'

const ChangeLogDemo: FC = () => {
  return (
    <Wrapper>
      <MainList />
      <EditorPreview />
      <EmotionBar />
      <EmotionBarBad />
    </Wrapper>
  )
}

export default ChangeLogDemo
