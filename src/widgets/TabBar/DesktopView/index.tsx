/*
 * TabBar
 */

import { type FC, memo } from 'react'

import SIZE from '@/const/size'
import { THREAD } from '@/const/thread'
import { ANCHOR } from '@/const/dom'

import { sortByIndex } from '@/helper'

import type { TProps } from '..'
import NormalView from './NormalView'

const TabBar: FC<TProps> = ({
  source,
  active = THREAD.POST,
  onChange = console.log,
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
