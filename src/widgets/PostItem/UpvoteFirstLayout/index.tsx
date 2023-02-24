/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost, TAccount, TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import { Wrapper } from '../styles/upvote_fist_layout'

/* eslint-disable-next-line */
const log = buildLog('w:PostItem:index')

type TProps = {
  article: TPost
  isMobilePreview: boolean

  onAuthorSelect?: (obj: TAccount) => void
  avatarLayout: TAvatarLayout
}

const PostItem: FC<TProps> = ({ article, onAuthorSelect = log, isMobilePreview, avatarLayout }) => {
  if (isMobilePreview) {
    return <MobileView article={article} onAuthorSelect={onAuthorSelect} />
  }

  return (
    <Wrapper>
      <MobileView article={article} onAuthorSelect={onAuthorSelect} />
      <DesktopView article={article} avatarLayout={avatarLayout} />
    </Wrapper>
  )
}

export default memo(PostItem)
