import { FC, memo } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import ArticlesThread from '@/containers//thread/ArticlesThread'
import KanbanThread from '@/containers//thread/KanbanThread'
import ChangeLogThread from '@/containers//thread/ChangelogThread'
// import WipThread from './WipThread'
import AboutThread from '@/containers/thread/AboutThread'
import DocThread from '@/containers/thread/DocThread'
// import DashboardThread from '@/containers/thread/DashboardThread'

type TProps = {
  thread: TThread
}

const ThreadContent: FC<TProps> = ({ thread }) => {
  switch (thread) {
    case THREAD.ABOUT: {
      return <AboutThread />
    }

    case THREAD.KANBAN: {
      return <KanbanThread />
    }

    case THREAD.CHANGELOG: {
      return <ChangeLogThread />
    }

    case THREAD.DOC: {
      return <DocThread />
    }

    default:
      return <ArticlesThread />
  }
}

export default memo(ThreadContent)
