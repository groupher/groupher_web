import { FC } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import DiscussTab from './DiscussTab'
import ChangelogTab from './ChangelogTab'
import KanbanTab from './KanbanTab'
import HelpTab from './HelpTab'

import { Wrapper } from '../styles/articles_intro_tabs/content'

type TProps = {
  tab: TThread
}

const Content: FC<TProps> = ({ tab }) => {
  let TabContent = null

  switch (tab) {
    case THREAD.POST: {
      TabContent = DiscussTab
      break
    }

    case THREAD.KANBAN: {
      TabContent = KanbanTab
      break
    }

    case THREAD.CHANGELOG: {
      TabContent = ChangelogTab
      break
    }

    case THREAD.DOC: {
      TabContent = HelpTab
      break
    }

    default: {
      TabContent = DiscussTab
    }
  }

  return (
    <Wrapper tab={tab}>
      <TabContent />
    </Wrapper>
  )
}

export default Content
