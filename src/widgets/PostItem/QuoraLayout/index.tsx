/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost } from '@/spec'
import { buildLog } from '@/logger'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import { Wrapper } from '../styles/quora_layout'

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
      <MobileView article={article} />
      <DesktopView article={article} />
    </Wrapper>
  )
}

export default memo(PostItem)
