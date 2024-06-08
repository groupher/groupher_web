import { type FC, useState } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/const/thread'

import Tabs from './Tabs'
import Content from './Content'

import { Wrapper } from '../styles/articles_intro_tabs'

const ArticlesIntroTabs: FC = () => {
  const [tab, setTab] = useState<TThread>(THREAD.POST)

  return (
    <Wrapper>
      <Tabs tab={tab} onChange={(tab) => setTab(tab)} />
      <Content tab={tab} />
    </Wrapper>
  )
}

export default ArticlesIntroTabs
