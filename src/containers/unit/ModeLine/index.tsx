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
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ModeLine')

type TProps = {
  modeLine?: TStore
  metric?: TMetric
}

const ModeLineContainer: FC<TProps> = ({ modeLine: store, metric = METRIC.COMMUNITY }) => {
  useInit(store, metric)
  const { viewingArticle, activeMenu, curCommunity, activeThread, enable, activeTag, groupedTags } =
    store

  return (
    <Fragment>
      {/* <TopBar
        metric={metric}
        visible={isTopBarVisiable}
        viewing={viewing}
        viewingArticle={viewingArticle}
      /> */}

      <CommunityLayout
        metric={metric}
        activeTag={activeTag}
        groupedTags={groupedTags}
        article={viewingArticle}
        community={curCommunity}
        activeMenu={activeMenu}
        activeThread={activeThread}
        enable={enable}
      />
    </Fragment>
  )
}

export default bond(ModeLineContainer, 'modeLine') as FC<TProps>
