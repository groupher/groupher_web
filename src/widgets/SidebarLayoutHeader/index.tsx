/*
 *
 * SidebarLayoutHeader
 *
 */

import { FC, memo } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import PostLayout from './PostLayout'
import DocLayout from './DocLayout'

type TProps = {
  testid?: string
  thread: TThread
}

const SidebarLayoutHeader: FC<TProps> = ({ testid = 'sidebar-layout-header', thread }) => {
  switch (thread) {
    case THREAD.POST: {
      return <PostLayout />
    }
    case THREAD.DOC: {
      return <DocLayout />
    }

    default: {
      return null
    }
  }
}

export default memo(SidebarLayoutHeader)
