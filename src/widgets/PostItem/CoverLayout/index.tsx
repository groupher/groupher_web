/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost, TC11N } from '@/spec'
import { buildLog } from '@/utils/logger'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import { Wrapper } from '../styles/minimal_layout'

/* eslint-disable-next-line */
const log = buildLog('w:PostItem:index')

type TProps = {
  article: TPost
  c11n: TC11N
  isMobilePreview: boolean
}

const PostItem: FC<TProps> = ({ article, isMobilePreview, c11n }) => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper c11n={c11n}>
      {isMobile || isMobilePreview ? (
        <MobileView article={article} />
      ) : (
        <DesktopView article={article} />
      )}
    </Wrapper>
  )
}

export default memo(PostItem)
