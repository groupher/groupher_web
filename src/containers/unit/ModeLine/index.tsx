/*
 * ModeLine
 */

import { Fragment, FC } from 'react'

import METRIC from '@/constant/metric'
import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import useMetric from '@/hooks/useMetric'

import type { TStore } from './store'
// import TopBar from './TopBar'
import CommunityLayout from './CommunityLayout'
import ArticleLayout from './ArticleLayout'

import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ModeLine')

type TProps = {
  modeLine?: TStore
}

const ModeLineContainer: FC<TProps> = ({ modeLine: store }) => {
  useInit(store)

  const metric = useMetric()

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
        activeTag={activeTag}
        groupedTags={groupedTags}
        article={viewingArticle}
        activeMenu={activeMenu}
      />
    </Fragment>
  )
}

export default bond(ModeLineContainer, 'modeLine') as FC<TProps>
