/*
 *
 * ChangelogItem
 *
 */

import { FC, Fragment, memo } from 'react'

import type { TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'

import ArticleLayout from './ArticleLayout'
import DefaultLayout from './DefaultLayout'

/* eslint-disable-next-line */
const log = buildLog('w:ChangelogItem:index')

type TProps = {
  showFullArticle?: boolean
  avatarLayout: TAvatarLayout
}

const PreviewLayout: FC<TProps> = ({ showFullArticle = false, avatarLayout }) => {
  return (
    <Fragment>
      {showFullArticle ? <ArticleLayout avatarLayout={avatarLayout} /> : <DefaultLayout />}
    </Fragment>
  )
}

export default memo(PreviewLayout)
