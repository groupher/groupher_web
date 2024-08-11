/*
 * TabBar
 */

import { type FC, memo } from 'react'

import type { TSizeSM, TThread } from '~/spec'

import type { TTabItem } from './spec'

import DesktopView from './DesktopView'

export type TProps = {
  source: TTabItem[]
  active: string
  size?: TSizeSM
  withIcon?: boolean
  onChange?: (thread: TThread) => void
}

const TabBar: FC<TProps> = (props) => {
  return <DesktopView {...props} />
}

export default memo(TabBar)
