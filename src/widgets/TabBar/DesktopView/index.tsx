/*
 * TabBar
 */

import { FC, memo } from 'react'

import SIZE from '@/const/size'
import { THREAD } from '@/const/thread'
import { ANCHOR } from '@/const/dom'

import { sortByIndex } from '@/helper'
import { buildLog } from '@/logger'

import type { TProps } from '..'
import NormalView from './NormalView'

const log = buildLog('w:TabBar:index')

const TabBar: FC<TProps> = ({
  source,
  active = THREAD.POST,
  onChange = log,
  size = SIZE.MEDIUM,
  withIcon = false,
}) => {
  const sortedSource = sortByIndex(source)

  return (
    <div id={ANCHOR.GLOBAL_TABBER_ID}>
      <NormalView
        source={sortedSource}
        active={active}
        onChange={onChange}
        size={size}
        withIcon={withIcon}
      />
    </div>
  )
}

export default memo(TabBar)
