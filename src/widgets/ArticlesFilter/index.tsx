/*
 *
 * ArticlesFilter
 *
 */

import { Fragment, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { buildLog } from '@/utils/logger'

import DesktopView from './DesktopView'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter = (props) => {
  const { isMobile } = useMobileDetect()

  return <Fragment>{!isMobile && <DesktopView {...props} />}</Fragment>
}

export default memo(ArticlesFilter)
