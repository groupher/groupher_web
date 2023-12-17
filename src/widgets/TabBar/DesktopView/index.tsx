/*
 * TabBar
 */

import { FC, memo } from 'react'

import SIZE from '@/constant/size'
import { THREAD } from '@/constant/thread'
import { ANCHOR } from '@/constant/dom'

import { sortByIndex } from '@/helper'
import { buildLog } from '@/logger'

import type { TProps } from '..'
import NormalView from './NormalView'

const _log = buildLog('w:TabBar:index')

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
