/*
 *
 * ArticlesFilter
 *
 */

import { FC, memo } from 'react'

import type { TArticleFilter, TResState, TArticleFilterMode, TGroupedTags, TTag } from '@/spec'
import { buildLog } from '@/utils/logger'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
import ModelineView from './ModelineView'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

export type TProps = {
  activeFilter?: TArticleFilter
  onSelect?: (filter: TArticleFilter) => void
  resState?: TResState
  mode?: TArticleFilterMode
  onSearch?: (v: string) => void
  closeSearch?: () => void
  groupedTags: TGroupedTags
  activeTag: TTag
}

const ArticlesFilter: FC<TProps> = (props) => {
  const { mode } = props
  if (mode === 'modeline') {
    return <ModelineView {...props} />
  }

  return (
    <>
      <DesktopView {...props} />
      <MobileView {...props} />
    </>
  )
}

export default memo(ArticlesFilter)
