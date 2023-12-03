import { FC } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import DiscussFeat from './DiscussFeat'
import ChangelogFeat from './ChangelogFeat'
import KanbanFeat from './KanbanFeat'
import HelpFeat from './HelpFeat'

import { Wrapper } from '../styles/articles_intro_tabs/content'

type TProps = {
  tab: TThread
}

const Content: FC<TProps> = ({ tab }) => {
  let TabContent = null

  switch (tab) {
    case THREAD.POST: {
      TabContent = DiscussFeat
      break
    }

    case THREAD.KANBAN: {
      TabContent = KanbanFeat
      break
    }

    case THREAD.CHANGELOG: {
      TabContent = ChangelogFeat
      break
    }

    case THREAD.DOC: {
      TabContent = HelpFeat
      break
    }

    default: {
      TabContent = DiscussFeat
    }
  }

  return (
    <Wrapper>
      <TabContent />
    </Wrapper>
  )
}

export default Content
