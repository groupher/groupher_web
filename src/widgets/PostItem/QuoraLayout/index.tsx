/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost, TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import { Wrapper } from '../styles/quora_layout'

/* eslint-disable-next-line */
const log = buildLog('w:PostItem:index')

type TProps = {
  article: TPost
  isMobilePreview: boolean

  avatarLayout: TAvatarLayout
}

const PostItem: FC<TProps> = ({ article, isMobilePreview, avatarLayout }) => {
  if (isMobilePreview) {
    return <MobileView article={article} />
  }

  return (
    <Wrapper>
      <MobileView article={article} />
      <DesktopView article={article} avatarLayout={avatarLayout} />
    </Wrapper>
  )
}

export default memo(PostItem)
