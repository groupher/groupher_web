/*
 *
 * ArticleViewer
 *
 */

import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import Comments from '@/containers/unit/Comments'

import DrawerHeader from './DrawerHeader'
import Viewer from './Viewer'

import { useStore } from './store'
import { Wrapper, CommentsWrapper } from './styles'
import { useInit } from './logic'

const _log = buildLog('C:ArticleViewer')

// const CollectionFolder = dynamic(
//   () => import('@/containers/tool/CollectionFolder'),
//   {
//     ssr: false,
//   },
// )

const ArticleViewer: FC = () => {
  const store = useStore()
  useInit(store)
  const { viewingArticle, documentData, loading } = store
  const article = Object.assign(viewingArticle, { document: documentData })

  return (
    <Wrapper $testid="article-viewer">
      <DrawerHeader />
      {/* @ts-ignore */}
      {/* <CollectionFolder /> */}
      <Viewer article={article} loading={loading} />
      <CommentsWrapper>
        <Comments />
      </CommentsWrapper>
    </Wrapper>
  )
}

export default observer(ArticleViewer)
