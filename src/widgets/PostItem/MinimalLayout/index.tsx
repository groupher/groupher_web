/*
 *
 * PostItem
 *
 */

import { FC, memo } from 'react'

import type { TPost, TAccount, TC11N } from '@/spec'
import { buildLog } from '@/utils/logger'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'

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

  onAuthorSelect?: (obj: TAccount) => void
}

const PostItem: FC<TProps> = ({ article, onAuthorSelect = log, isMobilePreview, c11n }) => {
  if (isMobilePreview) {
    return <MobileView article={article} />
  }

  return (
    <Wrapper c11n={c11n}>
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
