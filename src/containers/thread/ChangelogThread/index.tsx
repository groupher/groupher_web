/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BANNER_LAYOUT } from '@/constant/layout'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

import { useStore } from './store'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:ChangelogThread')

const ChangelogThread: FC = () => {
  const store = useStore()
  useInit(store)
  const { globalLayout, tagsMode, pagedChangelogsData } = store

  return globalLayout.banner === BANNER_LAYOUT.TABBER ? (
    <ClassicLayout tagsMode={tagsMode} pagedChangelogs={pagedChangelogsData} />
  ) : (
    <SimpleLayout pagedChangelogs={pagedChangelogsData} />
  )
}

export default observer(ChangelogThread)
