/*
 *
 * SidebarLayoutHeader
 *
 */

import { FC, memo } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/const/thread'

import PostLayout from './PostLayout'
import DocLayout from './DocLayout'

type TProps = {
  thread: TThread
}

const SidebarLayoutHeader: FC<TProps> = ({ thread }) => {
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
