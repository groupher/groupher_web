/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost } from '@/spec'
import { buildLog } from '@/logger'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import { Wrapper } from '../styles/minimal_layout'

/* eslint-disable-next-line */
const log = buildLog('w:PostItem:index')

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
