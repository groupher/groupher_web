/*
 *
 * ArticlesFilter
 *
 */

import { FC, memo } from 'react'

import type { TResState, TArticleFilterMode } from '@/spec'
import { buildLog } from '@/logger'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
import ModelineView from './ModelineView'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

export type TProps = {
  isMobile: boolean
  resState?: TResState
  mode?: TArticleFilterMode
}

const ArticlesFilter: FC<TProps> = (props) => {
  const { isMobile, mode } = props
  if (mode === 'modeline') {
    return <ModelineView {...props} />
  }

  return <>{isMobile ? <MobileView {...props} /> : <DesktopView {...props} />}</>
}

export default memo(ArticlesFilter)
