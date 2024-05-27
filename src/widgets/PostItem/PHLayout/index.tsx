/*
 *
 * PostItem
 *
 */

import { type FC, memo } from 'react'

import type { TPost } from '@/spec'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import { Wrapper } from '../styles/ph_layout'

type TProps = {
  article: TPost
  isMobilePreview: boolean
}

const PostItem: FC<TProps> = ({ article, isMobilePreview }) => {
  if (isMobilePreview) {
    return <MobileView article={article} />
  }

  return (
    <Wrapper>
      <MobileOnly>
        <MobileView article={article} />
      </MobileOnly>

      <DesktopOnly>
        <DesktopView article={article} />
      </DesktopOnly>
    </Wrapper>
  )
}

export default memo(PostItem)
