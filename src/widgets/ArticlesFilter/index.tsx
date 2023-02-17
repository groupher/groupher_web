/*
 *
 * ArticlesFilter
 *
 */

import { memo } from 'react'

import { buildLog } from '@/utils/logger'

import DesktopView from './DesktopView'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter = (props) => {
  return <DesktopView {...props} />
}

export default memo(ArticlesFilter)
