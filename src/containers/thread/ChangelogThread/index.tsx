/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'

import { BANNER_LAYOUT } from '@/constant/layout'
import { bond } from '@/mobx'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

import type { TStore } from './store'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:ChangelogThread')

type TProps = {
  changelogThread?: TStore
  testid?: string
}

const ChangelogThreadContainer: FC<TProps> = ({
  changelogThread: store,
  testid = 'changelog-thread',
}) => {
  useInit(store)
  const { globalLayout, tagsMode, pagedChangelogsData } = store

  console.log('## pagedChangelogsData: ', pagedChangelogsData)

  return globalLayout.banner === BANNER_LAYOUT.TABBER ? (
    <ClassicLayout tagsMode={tagsMode} pagedChangelogs={pagedChangelogsData} />
  ) : (
    <SimpleLayout pagedChangelogs={pagedChangelogsData} />
  )
}

export default bond(ChangelogThreadContainer, 'changelogThread') as FC<TProps>
