import type { FC } from 'react'

import type { TActive } from '@/spec'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'

import { Wrapper } from '../../styles/articles_intro_tabs/kanban_tab'

const KanbanFeat: FC<TActive> = ({ $active }) => {
  return (
    <Wrapper $active={$active}>
      <IntroDigest />
      <IntroImage />
    </Wrapper>
  )
}

export default KanbanFeat
