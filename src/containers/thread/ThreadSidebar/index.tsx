//

/*
 *
 * ThreadSidebar
 *
 */

import { FC } from 'react'

import { buildLog } from '@/logger'

import ClassicLayout from './ClassicLayout'

import { useStore } from './store'
import { useInit } from './logic'
import { observer } from 'mobx-react-lite'

/* eslint-disable-next-line */
const log = buildLog('C:ThreadSidebar')

const ThreadSidebar: FC = () => {
  const store = useStore()
  useInit(store)
  const { isCommunityDigestInViewport } = store

  return <ClassicLayout showCommunityBadge={isCommunityDigestInViewport} />
}

export default observer(ThreadSidebar)
