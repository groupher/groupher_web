/*
 * ArticleMenu
 */

import { FC, memo } from 'react'

import type { TArticle } from '@/spec'

import RealArticleMenu from './RealArticleMenu'

type TProps = {
  testid?: string
  verticalIcon?: boolean
  article: TArticle
}

const ArticleMenu: FC<TProps> = ({
  testid = 'artile-menu',
  verticalIcon = false,
  article,
}) => {
  return (
    // @ts-ignore
    <RealArticleMenu
      testid={testid}
      verticalIcon={verticalIcon}
      article={article}
    />
  )
}

export default memo(ArticleMenu)
