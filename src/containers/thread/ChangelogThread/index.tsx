/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'

import { BANNER_LAYOUT } from '@/constant/layout'
import { bond } from '@/utils/mobx'

import ClassicLayout from './ClassicLayout'
import FocusLayout from './FocusLayout'

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
  const { globalLayout, tagsMode } = store

  return globalLayout.banner === BANNER_LAYOUT.TABBER ? (
    <ClassicLayout globalLayout={globalLayout} tagsMode={tagsMode} />
  ) : (
    <FocusLayout globalLayout={globalLayout} isSidebarLayout={isSidebarLayout} />
  )
}

export default bond(ChangelogThreadContainer, 'changelogThread') as FC<TProps>
