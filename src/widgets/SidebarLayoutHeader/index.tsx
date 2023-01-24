/*
 *
 * SidebarLayoutHeader
 *
 */

import { FC, memo } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import PostLayout from './PostLayout'
import HelpLayout from './HelpLayout'

type TProps = {
  testid?: string
  thread: TThread
}

const SidebarLayoutHeader: FC<TProps> = ({ testid = 'sidebar-layout-header', thread }) => {
  switch (thread) {
    case THREAD.POST: {
      return <PostLayout />
    }
    case THREAD.HELP: {
      return <HelpLayout />
    }

    default: {
      return null
    }
  }
}

export default memo(SidebarLayoutHeader)
