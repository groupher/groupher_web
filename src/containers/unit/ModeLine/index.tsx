/*
 * ModeLine
 */

import { Fragment, FC } from 'react'
import { observer } from 'mobx-react-lite'

import METRIC from '@/constant/metric'
import { buildLog } from '@/logger'

import useMetric from '@/hooks/useMetric'

import { useStore } from './store'
import CommunityLayout from './CommunityLayout'
import ArticleLayout from './ArticleLayout'

import { useInit } from './logic'

const _log = buildLog('C:ModeLine')

const ModeLine: FC = () => {
  const store = useStore()
  useInit(store)

  const metric = useMetric()

  const { isMobile, isArticleBarVisiable, topBarVisiable, viewingArticle, activeMenu } = store

  if (metric === METRIC.ARTICLE) {
    return (
      <ArticleLayout
        isMobile={isMobile}
        show={isArticleBarVisiable}
        article={viewingArticle}
        activeMenu={activeMenu}
      />
    )
  }

  return (
    <Fragment>
      <CommunityLayout
        isMobile={isMobile}
        show={topBarVisiable}
        article={viewingArticle}
        activeMenu={activeMenu}
      />
    </Fragment>
  )
}

export default observer(ModeLine)
