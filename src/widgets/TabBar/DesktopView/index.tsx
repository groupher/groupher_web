/*
 * TabBar
 */

import { FC, memo } from 'react'

import type { TSizeSM, TC11NLayout } from '@/spec'

import SIZE from '@/constant/size'
import { THREAD } from '@/constant/thread'
import { ANCHOR } from '@/constant/dom'
import C11N from '@/constant/c11n'
import { HCN } from '@/constant/name'

import { sortByIndex } from '@/utils/helper'
import { buildLog } from '@/utils/logger'

import type { TTabItem } from '../spec'
import NormalView from './NormalView'

/* eslint-disable-next-line */
const log = buildLog('w:TabBar:index')

type TProps = {
  source: TTabItem[]
  active: string
  layout: TC11NLayout
  communitySlug: string
  size: TSizeSM
  onChange?: () => void
}

const TabBar: FC<TProps> = ({
  source,
  active = THREAD.POST,
  onChange = log,
  layout = C11N.CLASSIC,
  communitySlug = HCN,
  size = SIZE.MEDIUM,
}) => {
  const sortedSource = sortByIndex(source)

  return (
    <div id={ANCHOR.GLOBAL_TABBER_ID}>
      <NormalView
        layout={layout}
        source={sortedSource}
        active={active}
        onChange={onChange}
        size={size}
      />
    </div>
  )
}

export default memo(TabBar)
