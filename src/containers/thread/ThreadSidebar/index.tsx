//

/*
 *
 * ThreadSidebar
 *
 */

import { FC } from 'react'

import { buildLog } from '@/logger'
import { bond } from '@/mobx'

import ClassicLayout from './ClassicLayout'

import type { TStore } from './store'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ThreadSidebar')

export type TBaseProps = {
  //
}

export type TProps = { threadSidebar?: TStore } & TBaseProps

const ThreadSidebarContainer: FC<TProps> = ({ threadSidebar: store }) => {
  useInit(store)
  const { isCommunityDigestInViewport } = store

  return <ClassicLayout showCommunityBadge={isCommunityDigestInViewport} />
}

export default bond(ThreadSidebarContainer, 'threadSidebar') as FC<TProps>
