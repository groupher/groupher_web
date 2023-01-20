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
}

const ChangelogThreadContainer: FC<TProps> = ({
  changelogThread: store,
  testid = 'changelog-thread',
}) => {
  useInit(store)
  const { globalLayout, tagsMode } = store

  return globalLayout.banner === BANNER_LAYOUT.HEADER ? (
    <FocusLayout globalLayout={globalLayout} />
  ) : (
    <ClassicLayout globalLayout={globalLayout} tagsMode={tagsMode} />
  )
}

export default bond(ChangelogThreadContainer, 'changelogThread') as FC<TProps>
