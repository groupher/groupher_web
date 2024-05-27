/*
 *
 * PostItem
 *
 */

import { type FC, memo } from 'react'

import type { TPost } from '@/spec'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import { Wrapper } from '../styles/minimal_layout'

type TProps = {
  article: TPost
  isMobilePreview: boolean
}

const PostItem: FC<TProps> = ({ article, isMobilePreview }) => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper>
      {isMobile || isMobilePreview ? (
        <MobileView article={article} />
      ) : (
        <DesktopView article={article} />
      )}
    </Wrapper>
  )
}

export default memo(PostItem)
