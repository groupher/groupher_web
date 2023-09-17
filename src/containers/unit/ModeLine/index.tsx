/*
 * ModeLine
 */

import { Fragment, FC } from 'react'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import type { TStore } from './store'
// import TopBar from './TopBar'
import CommunityLayout from './CommunityLayout'
import ArticleLayout from './ArticleLayout'

import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ModeLine')

type TProps = {
  modeLine?: TStore
  metric?: TMetric
}

const ModeLineContainer: FC<TProps> = ({ modeLine: store, metric = METRIC.COMMUNITY }) => {
  useInit(store, metric)
  const {
    isMobile,
    isArticleBarVisiable,
    topBarVisiable,
    viewingArticle,
    activeMenu,
    activeTag,
    groupedTags,
  } = store

  if (metric === METRIC.ARTICLE) {
    return (
      <ArticleLayout
        isMobile={isMobile}
        show={isArticleBarVisiable}
        metric={metric}
        article={viewingArticle}
        activeMenu={activeMenu}
      />
    )
  }

  return (
    <Fragment>
      {/* <TopBar
        metric={metric}
        visible={isTopBarVisiable}
        viewing={viewing}
        viewingArticle={viewingArticle}
      /> */}

      <CommunityLayout
        isMobile={isMobile}
        show={topBarVisiable}
        metric={metric}
        activeTag={activeTag}
        groupedTags={groupedTags}
        article={viewingArticle}
        activeMenu={activeMenu}
      />
    </Fragment>
  )
}

export default bond(ModeLineContainer, 'modeLine') as FC<TProps>
