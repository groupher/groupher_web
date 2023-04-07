/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'

import { BANNER_LAYOUT } from '@/constant/layout'
import { bond } from '@/utils/mobx'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

import type { TStore } from './store'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:ChangelogThread')

type TProps = {
  changelogThread?: TStore
  testid?: string
  isSidebarLayout?: boolean
}

const ChangelogThreadContainer: FC<TProps> = ({
  changelogThread: store,
  testid = 'changelog-thread',
  isSidebarLayout = false,
}) => {
  useInit(store)
  const { globalLayout, tagsMode, avatarLayout, pagedChangelogsData } = store

  return globalLayout.banner === BANNER_LAYOUT.TABBER ? (
    <ClassicLayout
      globalLayout={globalLayout}
      tagsMode={tagsMode}
      avatarLayout={avatarLayout}
      pagedChangelogs={pagedChangelogsData}
    />
  ) : (
    <SimpleLayout
      globalLayout={globalLayout}
      isSidebarLayout={isSidebarLayout}
      avatarLayout={avatarLayout}
      pagedChangelogs={pagedChangelogsData}
    />
  )
}

export default bond(ChangelogThreadContainer, 'changelogThread') as FC<TProps>
