import { FC, memo } from 'react'
import dynamic from 'next/dynamic'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import ArticlesThread from '@/containers//thread/ArticlesThread'
import KanbanThread from '@/containers//thread/KanbanThread'
import ChangeLogThread from '@/containers//thread/ChangelogThread'
// import WipThread from './WipThread'
import AboutThread from '@/containers/thread/AboutThread'
import HelpThread from '@/containers/thread/HelpThread'
// import DashboardThread from '@/containers/thread/DashboardThread'

const DashboardThread = dynamic(() => import('@/containers/thread/DashboardThread'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

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

    case THREAD.HELP: {
      return <HelpThread />
    }

    case THREAD.DASHBOARD: {
      return <DashboardThread />
    }

    default:
      return <ArticlesThread />
  }
}

export default memo(ThreadContent)
