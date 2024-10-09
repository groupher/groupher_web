import type { FC } from 'react'

import MainList from './MainList'
import EditorPreview from './EditorPreview'
import EmotionBar from './EmotionBar'
import EmotionBarBad from './EmotionBarBad'

import useSalon from '../../../styles/articles_intro_tabs/changelog_tab/changelog_demo'

const ChangeLogDemo: FC = () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <MainList />
      <EditorPreview />
      <EmotionBar />
      <EmotionBarBad />
    </div>
  )
}

export default ChangeLogDemo
