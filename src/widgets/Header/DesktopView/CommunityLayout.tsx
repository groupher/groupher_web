/*
 *
 * Header
 *
 */

import { type FC, lazy, Suspense } from 'react'
import { includes } from 'ramda'

import type { TMetric } from '~/spec'
import METRIC from '~/const/metric'

import Navigator from '~/widgets/Navigator'

import type { TProps } from '..'
import {
  Wrapper,
  ClassicInnerWrapper,
  RouterWrapper,
} from '../styles/desktop_view/community_layout'

// let MailBox
const AddOns = lazy(() => import('../AddOns'))

const hasNoBorder = (metric: TMetric): boolean =>
  includes(metric, [
    METRIC.EXPLORE,
    METRIC.SPONSOR,
    METRIC.SUPPORT_US,
    METRIC.SUBSCRIBE,
    METRIC.ARTICLE,
    METRIC.MEMBERSHIP,
    METRIC.USER,
    METRIC.COMMUNITY_EDITOR,
    METRIC.HELP_CENTER,
  ])

const CommunityView: FC<TProps> = ({ metric, accountInfo }) => {
  const InnerWrapper = ClassicInnerWrapper

  return (
    <Wrapper id="whereCallShowDoraemon" $testid="header" noBorder={hasNoBorder(metric)}>
      <InnerWrapper metric={metric}>
        <RouterWrapper>
          <Navigator metric={metric} />
        </RouterWrapper>
        <Suspense fallback={null}>
          {/* @ts-ignore */}
          <AddOns accountInfo={accountInfo} />
        </Suspense>
      </InnerWrapper>
    </Wrapper>
  )
}

export default CommunityView
