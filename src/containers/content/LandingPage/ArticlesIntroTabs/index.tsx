import { FC, useState } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import Tabs from './Tabs'

import { Wrapper, ContentWrapper } from '../styles/articles_intro_tabs'

const ArticlesIntroTabs: FC = () => {
  const [tab, setTab] = useState<TThread>(THREAD.POST)

  return (
    <Wrapper>
      <Tabs tab={tab} onChange={(tab) => setTab(tab)} />
      <ContentWrapper>contents</ContentWrapper>
    </Wrapper>
  )
}

export default ArticlesIntroTabs
